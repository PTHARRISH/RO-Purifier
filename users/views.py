from decimal import Decimal, InvalidOperation
from math import ceil

from django.contrib.auth import get_user_model
from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from django.db import transaction
from django.db.models import Avg, Count, Max, Sum
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import (
    Booking,
    Cart,
    CartItem,
    Notification,
    Order,
    OrderItem,
    Product,
    ProductReview,
    ProductReviewImage,
    Profile,
    TechnicianReview,
)
from users.permissions import AdminUser, IsUserRole, TechnicianUser
from users.serializers import (
    AddToCartSerializer,
    AdminProfileSerializer,
    AdminUserDetailSerializer,
    BookingDetailSerializer,
    CartItemSerializer,
    CartSerializer,
    CheckoutResponseSerializer,
    CheckoutSerializer,
    DeleteAccountResponseSerializer,
    EmptyProfileSerializer,
    EmptyResponseSerializer,
    HomeSerializer,
    LoginSerializer,
    NotificationSerializer,
    ProductLandingSerializer,
    ProductReviewSerializer,
    ProductSerializer,
    RegisterSerializer,
    TechnicianBookingSerializer,
    TechnicianLandingSerializer,
    TechnicianProfileSerializer,
    TechnicianReviewSerializer,
    TechnicianSummarySerializer,
    UpdateCartItemSerializer,
    UserBookingHistorySerializer,
    UserProfileSerializer,
)
from users.utils import paginate, parse_date_range

User = get_user_model()
signer = TimestampSigner()


class UserRegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        data = request.data.copy()
        data["role"] = "user"

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TechnicianRegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        data = request.data.copy()
        data["role"] = "technician"

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Technician registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminRegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        data = request.data.copy()
        data["role"] = "admin"

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Admin registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "login"

    def post(self, request):
        # Validate input using serializer
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        identifier = serializer.validated_data.get("identifier").strip()
        password = serializer.validated_data.get("password")

        user = None

        # Try username
        try:
            user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            pass

        # Try email
        if user is None:
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                pass

        # Try mobile
        if user is None and identifier.isdigit():
            try:
                mobile_value = Decimal(identifier)
                user = User.objects.get(mobile=mobile_value)
            except (User.DoesNotExist, ValueError, InvalidOperation):
                pass

        # User not found
        if not user:
            print(f"[LOGIN ERROR] User not found: {identifier}")
            return Response(
                {"error": "Invalid credentials. User not found."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Password check
        if not user.check_password(password):
            print(f"[LOGIN ERROR] Wrong password for user: {user.username}")
            return Response(
                {"error": "Invalid credentials. Incorrect password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Account disabled
        if not user.is_active:
            print(f"[LOGIN ERROR] Disabled account: {user.username}")
            return Response(
                {"error": "User account is disabled."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Successful login
        print(f"[LOGIN SUCCESS] User authenticated: {user.username}")

        refresh = RefreshToken.for_user(user)

        # Auto-redirect URL based on role
        redirect_url = f"/profile/{user.username}/"

        return Response(
            {
                "message": "Login successful",
                "username": user.username,
                "fullname": user.fullname,
                "role": user.role,
                "redirect_url": redirect_url,
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
            },
            status=status.HTTP_200_OK,
        )


class HomeView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = HomeSerializer  # for Swagger/OpenAPI

    def get(self, request):
        # Top 10 most popular products (using reviews as proxy)
        top_products = Product.objects.annotate(
            total_sold=Count("reviews__id")
        ).order_by("-total_sold")[:10]

        # Top 10 technicians by bookings
        top_technicians = (
            Profile.objects.annotate(total_bookings=Count("bookings"))
            .filter(profile_status="active")
            .order_by("-total_bookings")[:10]
        )

        # Suggested product: RO Purifier
        ro_purifier = Product.objects.filter(
            product_name__icontains="RO Purifier"
        ).first()

        data = {
            "top_products": ProductLandingSerializer(top_products, many=True).data,
            "top_technicians": TechnicianLandingSerializer(
                top_technicians, many=True
            ).data,
            "suggested_product": (
                ProductLandingSerializer(ro_purifier).data if ro_purifier else None
            ),
        }

        return Response(data)


class ProfileView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.select_related("user")

    # ------------------------------------------------
    # MUST ALWAYS RETURN A SERIALIZER CLASS
    # ------------------------------------------------
    def get_serializer_class(self):
        request = getattr(self, "request", None)
        kwargs = getattr(self, "kwargs", {})

        # Schema generation / no request
        if not request or "username" not in kwargs:
            return EmptyProfileSerializer

        request_user = request.user
        username = kwargs.get("username")

        user = User.objects.filter(username=username).first()
        if not user:
            return EmptyProfileSerializer

        if request_user.role == "admin":
            return AdminProfileSerializer

        if request_user.role == "technician" and request_user == user:
            return TechnicianProfileSerializer

        if request_user.role == "user" and request_user == user:
            return UserProfileSerializer

        # ❗ NEVER return None
        return EmptyProfileSerializer

    # ------------------------------------------------
    # GET
    # ------------------------------------------------
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        profile = get_object_or_404(Profile, user=user)

        serializer_class = self.get_serializer_class()

        # Permission enforcement HERE (not in get_serializer_class)
        if serializer_class is EmptyProfileSerializer:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = serializer_class(profile)
        return Response(serializer.data)

    # ------------------------------------------------
    # PUT
    # ------------------------------------------------
    def put(self, request, username):
        user = get_object_or_404(User, username=username)
        profile = get_object_or_404(Profile, user=user)

        serializer_class = self.get_serializer_class()

        if serializer_class is EmptyProfileSerializer:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = serializer_class(
            profile,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "Profile updated successfully"},
            status=status.HTTP_200_OK,
        )


class ProductListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "product_list"
    serializer_class = ProductSerializer
    queryset = Product.objects.all().prefetch_related("images", "tags", "reviews")

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = ["brand", "status", "price"]
    search_fields = ["product_name", "description"]
    ordering_fields = ["price", "product_name", "average_rating"]
    ordering = ["price"]


class ProductReviewCreateUpdateView(GenericAPIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductReviewSerializer

    def post(self, request, product_id):
        user = request.user
        product = get_object_or_404(Product, id=product_id)

        # Ensure the user purchased this product
        purchased = OrderItem.objects.filter(order__user=user, product=product).exists()
        if not purchased:
            return Response(
                {"error": "You can review this product only after purchasing it."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        review, created = ProductReview.objects.get_or_create(
            user=user,
            product=product,
            defaults={
                "rating": request.data.get("rating"),
                "review_text": request.data.get("review_text", ""),
            },
        )

        if not created:
            review.rating = request.data.get("rating")
            review.review_text = request.data.get("review_text", "")
            review.save()

        # Handle images
        images = request.FILES.getlist("images")
        for img in images:
            ProductReviewImage.objects.create(review=review, image=img)

        serializer = self.get_serializer(review)
        return Response(serializer.data)


class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    def get(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        serializer = self.serializer_class(product)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminDashboardView(APIView):
    permission_classes = [AdminUser]
    serializer_class = TechnicianSummarySerializer

    def get(self, request):
        start, end = parse_date_range(request)
        status_filter = request.GET.get("status")
        total_users = User.objects.filter(role="user").count()
        total_technicians = User.objects.filter(role="technician").count()
        bookings_qs = Booking.objects.filter(date_time_start__range=[start, end])
        if status_filter:
            bookings_qs = bookings_qs.filter(service_status=status_filter)

        total_bookings = bookings_qs.count()
        total_earnings = bookings_qs.aggregate(total=Sum("price"))["total"] or 0

        # ===== If technician detail is requested =====
        tech_id = request.GET.get("technician_id")
        if tech_id:
            tech = get_object_or_404(Profile, id=tech_id)
            tech_bookings = Booking.objects.filter(technician=tech).order_by(
                "-date_time_start"
            )

            page = paginate(request, tech_bookings)
            serializer = BookingDetailSerializer(page["results"], many=True)

            return Response(
                {
                    "technician": tech.user.username,
                    "total": page["total"],
                    "page": page["page"],
                    "page_size": page["page_size"],
                    "results": serializer.data,
                }
            )

        # ---------- 3. TECHNICIAN SUMMARY ----------
        tech_qs = Profile.objects.select_related("user").annotate(
            avg_rating=Avg("reviews__rating"),
            total_bookings=Count("bookings"),
            earnings=Sum("bookings__price"),
            unique_users=Count("bookings__user", distinct=True),
        )

        tech_page = paginate(request, tech_qs)
        tech_serializer = self.serializer_class(tech_page["results"], many=True)

        # ---------- 4. FINAL RESPONSE ----------
        return Response(
            {
                "counts": {
                    "total_users": total_users,
                    "total_technicians": total_technicians,
                    "total_bookings": total_bookings,
                    "total_earnings": float(total_earnings),
                },
                "technicians": {
                    "page": tech_page["page"],
                    "page_size": tech_page["page_size"],
                    "total": tech_page["total"],
                    "results": tech_serializer.data,
                },
            }
        )


class AdminUserDetailView(APIView):
    permission_classes = [AdminUser]
    serializer_class = AdminUserDetailSerializer

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # --------- USER SUMMARY (aggregations) ----------
        user_stats = (
            User.objects.filter(id=user_id)
            .annotate(
                total_bookings=Count("bookings"),
                total_spent=Sum("bookings__price"),
                last_booking=Max("bookings__date_time_start"),
                avg_rating=Avg(
                    "reviews_given__rating"
                ),  # reviews user gave to technicians
            )
            .first()
        )
        if not user_stats:
            return Response({"error": "User not found"}, status=404)

        summary_data = self.serializer_class(user_stats).data

        # --------- BOOKING HISTORY (paginated) ----------
        booking_qs = Booking.objects.filter(user=user).order_by("-date_time_start")

        page = paginate(request, booking_qs, page_size_default=20)
        booking_data = UserBookingHistorySerializer(page["results"], many=True).data

        return Response(
            {
                "user": summary_data,
                "bookings": {
                    "page": page["page"],
                    "page_size": page["page_size"],
                    "total": page["total"],
                    "results": booking_data,
                },
            }
        )


class DeleteAccountView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = DeleteAccountResponseSerializer

    def get(self, request):
        token = request.GET.get("token")
        if not token:
            return Response(
                {"message": "Token required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            unsigned = signer.unsign(token, max_age=86400)  # 24h
            user = get_user_model().objects.get(pk=unsigned)
        except SignatureExpired:
            return Response(
                {"message": "Link expired"}, status=status.HTTP_400_BAD_REQUEST
            )
        except (BadSignature, get_user_model().DoesNotExist):
            return Response(
                {"message": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST
            )

        user.delete()
        return Response(
            {"message": "Account deleted successfully."}, status=status.HTTP_200_OK
        )


class TechnicianBookingsView(GenericAPIView):
    permission_classes = [IsAuthenticated, TechnicianUser]
    serializer_class = TechnicianBookingSerializer

    def get(self, request):
        try:
            profile = request.user.profile
        except Profile.DoesNotExist:
            return Response(
                {"detail": "Profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        bookings = profile.bookings.order_by("-date_time_start")
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)


class TechnicianNotificationsView(GenericAPIView):
    permission_classes = [IsAuthenticated, TechnicianUser]
    serializer_class = NotificationSerializer

    def get(self, request):
        profile = request.user.profile
        qs = profile.notifications.order_by("-created_at")
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class AddToCartView(GenericAPIView):
    permission_classes = [IsAuthenticated, IsUserRole]
    serializer_class = AddToCartSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = get_object_or_404(Product, pk=serializer.validated_data["product_id"])
        qty = serializer.validated_data.get("quantity", 1)

        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": qty, "unit_price": product.price},
        )

        if not created:
            cart_item.quantity += qty
            cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class CartDetailView(GenericAPIView):
    permission_classes = [IsAuthenticated, IsUserRole]
    serializer_class = CartSerializer

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)


# -------------------------------
# Update Cart Item
# -------------------------------
class UpdateCartItemView(GenericAPIView):
    permission_classes = [IsAuthenticated, IsUserRole]
    serializer_class = UpdateCartItemSerializer

    def patch(self, request, item_id):
        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)
        cart_item = get_object_or_404(CartItem, pk=item_id, cart=cart)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cart_item.quantity = serializer.validated_data["quantity"]
        cart_item.save()

        return Response(CartItemSerializer(cart_item).data)


# -------------------------------
# Remove Cart Item
# -------------------------------
class RemoveCartItemView(GenericAPIView):
    permission_classes = [IsAuthenticated, IsUserRole]
    serializer_class = EmptyResponseSerializer

    def delete(self, request, item_id):
        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)
        cart_item = get_object_or_404(CartItem, pk=item_id, cart=cart)
        mode = request.query_params.get("mode", "all")

        if mode == "one":
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
        else:
            cart_item.delete()

        # Return 204 No Content
        return Response(status=status.HTTP_204_NO_CONTENT)


class CheckoutView(GenericAPIView):
    permission_classes = [IsAuthenticated, IsUserRole]
    serializer_class = CheckoutSerializer  # request serializer

    @transaction.atomic
    def post(self, request):
        # -------- CART ----------
        cart = get_object_or_404(Cart, user=request.user, is_active=True)

        if not cart.items.exists():
            return Response(
                {"detail": "Cart is empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # -------- VALIDATE INPUT ----------
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        # -------- ADDRESS RESOLUTION ----------
        chosen_address = None
        if "address_index" in data:
            idx = data["address_index"]
            ua = getattr(request.user, "address", None)

            if ua is None:
                return Response(
                    {"detail": "No saved addresses found."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if isinstance(ua, list):
                try:
                    chosen_address = ua[idx]
                except Exception:
                    return Response(
                        {"detail": "Invalid address_index."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            elif isinstance(ua, dict) and idx == 0:
                chosen_address = ua
            else:
                return Response(
                    {"detail": "Invalid address selection."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            chosen_address = data.get("address")

        # -------- ITEMS TOTAL ----------
        items_total = Decimal("0.00")
        for item in cart.items.all():
            items_total += Decimal(item.unit_price) * item.quantity

        # -------- TECHNICIAN HANDLING ----------
        technician = None
        technician_fee = Decimal("0.00")
        booking_obj = None

        if data.get("technician_id"):
            technician = get_object_or_404(Profile, pk=data["technician_id"])

            start = data["date_time_start"]
            end = data["date_time_end"]
            delta = end - start

            if technician.price_day:
                days = int(ceil(delta.total_seconds() / (24 * 3600)))
                technician_fee = Decimal(technician.price_day) * days
            elif technician.price_hour:
                hours = int(ceil(delta.total_seconds() / 3600))
                technician_fee = Decimal(technician.price_hour) * hours

            technician_fee = technician_fee.quantize(Decimal("0.01"))

        # -------- TOTAL ----------
        total = (items_total + technician_fee).quantize(Decimal("0.01"))

        # -------- CREATE ORDER ----------
        order = Order.objects.create(
            user=request.user,
            cart=cart,
            total=total,
            address=chosen_address,
            payment_method=data["payment_method"],
            payment_done=data.get("payment_done", False),
            technician=technician,
            technician_fee=technician_fee,
            notes=data.get("notes", ""),
        )

        # -------- ORDER ITEMS ----------
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                unit_price=item.unit_price,
                quantity=item.quantity,
                line_total=(Decimal(item.unit_price) * Decimal(item.quantity)).quantize(
                    Decimal("0.01")
                ),
            )

        # -------- BOOKING ----------
        if technician:
            booking_obj = Booking.objects.create(
                technician=technician,
                user=request.user,
                date_time_start=data["date_time_start"],
                date_time_end=data["date_time_end"],
                address=chosen_address,
                payment_done=order.payment_done,
                price=technician_fee,
                service_status="pending",
            )

            order.booking = booking_obj
            order.save()

            Notification.objects.create(
                recipient=technician,
                title=f"New booking request (Order {order.pk})",
                message=(f"You have a new booking from {request.user.username}."),
                metadata={
                    "order_id": order.pk,
                    "booking_id": booking_obj.pk,
                    "user_id": request.user.pk,
                },
            )

        # -------- FINALIZE CART ----------
        cart.is_active = False
        cart.save()

        Cart.objects.create(user=request.user, is_active=True)

        # -------- RESPONSE ----------
        response_data = {
            "order_id": order.pk,
            "total": order.total,
            "payment_done": order.payment_done,
            "booking_id": booking_obj.pk if booking_obj else None,
        }

        return Response(
            CheckoutResponseSerializer(response_data).data,
            status=status.HTTP_201_CREATED,
        )


class TechnicianReviewView(GenericAPIView):
    permission_classes = [IsAuthenticated, IsUserRole]
    serializer_class = TechnicianReviewSerializer

    def post(self, request, booking_id):
        user = request.user
        booking = get_object_or_404(Booking, id=booking_id, user=user)

        if booking.service_status != "completed":
            return Response(
                {"error": "You can review only completed services."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if TechnicianReview.objects.filter(booking=booking).exists():
            return Response(
                {"error": "You already reviewed this service."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        review = serializer.save(
            technician=booking.technician, user=user, booking=booking
        )

        return Response(
            self.get_serializer(review).data, status=status.HTTP_201_CREATED
        )
