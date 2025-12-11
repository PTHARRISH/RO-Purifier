from decimal import Decimal, InvalidOperation
from math import ceil

from django.contrib.auth import get_user_model
from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from django.db import transaction
from django.db.models import Avg, Count, Max, Sum
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsUserRole,
    TechnicianUser,
)
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
    Profile,
)
from users.permissions import AdminUser
from users.serializers import (
    AddToCartSerializer,
    AdminProfileSerializer,
    AdminUserDetailSerializer,
    BookingDetailSerializer,
    CartItemSerializer,
    CartSerializer,
    CheckoutSerializer,
    LoginSerializer,
    ProductReviewSerializer,
    ProductSerializer,
    RegisterSerializer,
    TechnicianProfileSerializer,
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


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get_profile(self, username):
        try:
            user = User.objects.get(username=username)
            profile = Profile.objects.filter(user=user).first()
            if not profile:
                return None, None
            return user, profile
        except User.DoesNotExist:
            return None, None

    def get_serializer_class(self, request_user, profile_user):
        if request_user.role == "admin":
            return AdminProfileSerializer

        if request_user.role == "technician" and request_user == profile_user:
            return TechnicianProfileSerializer

        if request_user.role == "user" and request_user == profile_user:
            return UserProfileSerializer

        return None

    def get(self, request, username):
        user, profile = self.get_profile(username)
        if not user:
            return Response({"error": "User not found"}, status=404)

        serializer_class = self.get_serializer_class(request.user, user)
        if not serializer_class:
            return Response({"error": "Permission denied"}, status=403)

        serializer = serializer_class(profile)
        return Response(serializer.data)

    def put(self, request, username):
        user, profile = self.get_profile(username)
        if not user:
            return Response({"error": "User not found"}, status=404)

        serializer_class = self.get_serializer_class(request.user, user)
        if not serializer_class:
            return Response({"error": "Permission denied"}, status=403)

        serializer = serializer_class(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully"})
        return Response(serializer.errors, status=400)


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


class ProductReviewCreateUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductReviewSerializer

    def post(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)

        try:
            review = ProductReview.objects.get(product=product, user=request.user)
            serializer = self.serializer_class(review, data=request.data, partial=True)
        except ProductReview.DoesNotExist:
            serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(product=product, user=request.user)
            return Response(
                {"message": "Review submitted successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class DeleteAccountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.GET.get("token")
        if not token:
            return JsonResponse({"error": "Token required"}, status=400)

        try:
            # Verify and check expiration (max_age in seconds = 24h)
            unsigned = signer.unsign(token, max_age=86400)
            user = get_user_model().objects.get(pk=unsigned)
        except SignatureExpired:
            return JsonResponse({"error": "Link expired"}, status=400)
        except (BadSignature, get_user_model().DoesNotExist):
            return JsonResponse({"error": "Invalid link"}, status=400)

        # Delete user and profile
        user.delete()
        return JsonResponse({"message": "Account deleted successfully."}, status=200)


class TechnicianBookingsView(APIView):
    permission_classes = [IsAuthenticated, TechnicianUser]

    def get(self, request):
        # technician is Profile linked to user
        try:
            profile = request.user.profile
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=404)
        bookings = profile.bookings.all().order_by("-date_time_start")
        data = []
        for b in bookings:
            data.append(
                {
                    "id": b.pk,
                    "user": {
                        "id": b.user.id,
                        "username": b.user.username,
                        "fullname": b.user.fullname,
                    },
                    "date_time_start": b.date_time_start,
                    "date_time_end": b.date_time_end,
                    "address": b.address,
                    "price": b.price,
                    "service_status": b.service_status,
                    "payment_done": b.payment_done,
                }
            )
        return Response(data)


class TechnicianNotificationsView(APIView):
    permission_classes = [IsAuthenticated, TechnicianUser]

    def get(self, request):
        profile = request.user.profile
        qs = profile.notifications.order_by("-created_at")
        data = [
            {
                "id": n.pk,
                "title": n.title,
                "message": n.message,
                "created_at": n.created_at,
                "is_read": n.is_read,
            }
            for n in qs
        ]
        return Response(data)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated, IsUserRole]

    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = get_object_or_404(Product, pk=serializer.validated_data["product_id"])
        qty = serializer.validated_data.get("quantity", 1)

        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)

        # get or create cart item; increment quantity if exists
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": qty, "unit_price": product.price},
        )
        if not created:
            cart_item.quantity = cart_item.quantity + qty
            cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class CartDetailView(APIView):
    permission_classes = [IsAuthenticated, IsUserRole]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)
        return Response(CartSerializer(cart).data)


class UpdateCartItemView(APIView):
    permission_classes = [IsAuthenticated, IsUserRole]

    def patch(self, request, item_id):
        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)
        cart_item = get_object_or_404(CartItem, pk=item_id, cart=cart)
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart_item.quantity = serializer.validated_data["quantity"]
        cart_item.save()
        return Response(CartItemSerializer(cart_item).data)


class RemoveCartItemView(APIView):
    permission_classes = [IsAuthenticated, IsUserRole]

    def delete(self, request, item_id):
        cart, _ = Cart.objects.get_or_create(user=request.user, is_active=True)
        cart_item = get_object_or_404(CartItem, pk=item_id, cart=cart)
        mode = request.query_params.get("mode", "all")
        # default to removing entire item
        if mode == "one":
            # remove just one quantity
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                # if quantity becomes 0 → delete item
                cart_item.delete()
        else:
            # remove entire item
            cart_item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated, IsUserRole]

    @transaction.atomic
    def post(self, request):
        cart = get_object_or_404(Cart, user=request.user, is_active=True)
        if not cart.items.exists():
            return Response(
                {"detail": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        # Resolve address
        chosen_address = None
        if "address_index" in data:
            idx = data["address_index"]
            # expect user.address to be a list of address objects OR a single object
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

        # calculate items total
        items_total = Decimal(0)
        for it in cart.items.all():
            items_total += Decimal(it.unit_price) * it.quantity

        # technician handling
        technician = None
        technician_fee = Decimal(0)
        booking_obj = None
        if data.get("technician_id"):
            tech = get_object_or_404(Profile, pk=data["technician_id"])
            technician = tech
            # calculate duration; prefer price_day; fallback to price_hour
            start = data["date_time_start"]
            end = data["date_time_end"]
            delta = end - start
            # days as integer (count partial as full)
            days = int(ceil(delta.total_seconds() / (24 * 3600)))
            if tech.price_day:
                technician_fee = (Decimal(tech.price_day) * Decimal(days)).quantize(
                    Decimal("0.01")
                )
            elif tech.price_hour:
                hours = int(ceil(delta.total_seconds() / 3600))
                technician_fee = (Decimal(tech.price_hour) * Decimal(hours)).quantize(
                    Decimal("0.01")
                )
            else:
                technician_fee = Decimal(0)

        total = (items_total + technician_fee).quantize(Decimal("0.01"))

        # create Order
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

        # create order items
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

        # If technician selected, create Booking and attach to order.
        if technician:
            booking_price = technician_fee
            booking_obj = Booking.objects.create(
                technician=technician,
                user=request.user,
                date_time_start=data["date_time_start"],
                date_time_end=data["date_time_end"],
                address=chosen_address,
                payment_done=order.payment_done,
                price=booking_price,
                service_status="pending",
            )
            order.booking = booking_obj
            order.save()

            # Notify technician
            Notification.objects.create(
                recipient=technician,
                title=f"New booking request (Order {order.pk})",
                message=f"You have a new booking from {request.user.username}.",
                metadata={
                    "order_id": order.pk,
                    "booking_id": booking_obj.pk,
                    "user_id": request.user.pk,
                },
            )

        # mark cart inactive (checkout)
        cart.is_active = False
        cart.save()

        # Optionally create a fresh cart for user
        Cart.objects.create(user=request.user, is_active=True)

        return Response(
            {
                "order_id": order.pk,
                "total": order.total,
                "payment_done": order.payment_done,
                "booking_id": booking_obj.pk if booking_obj else None,
            },
            status=status.HTTP_201_CREATED,
        )
