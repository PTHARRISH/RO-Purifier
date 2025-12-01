from decimal import Decimal, InvalidOperation

from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Max, Sum
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import Booking, Profile
from users.permissions import AdminUser
from users.serializers import (
    AdminUserDetailSerializer,
    BookingDetailSerializer,
    LoginSerializer,
    RegisterSerializer,
    TechnicianSummarySerializer,
    UserBookingHistorySerializer,
)
from users.utils import paginate, parse_date_range

User = get_user_model()


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

    def post(self, request):
        # Validate input using serializer
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Debug logging — visible in Django terminal
        print("=" * 60)
        print("[LOGIN REQUEST] Received POST request!")
        print(f"[IP] {request.META.get('REMOTE_ADDR', 'Unknown')}")
        print(f"[PATH] {request.path}")
        print(f"[METHOD] {request.method}")
        print(f"[CONTENT-TYPE] {request.content_type}")
        print(f"[DATA] {dict(request.data)}")
        print("=" * 60)

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
        redirect_url = f"/{user.role}/{user.username}/"

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


# Admin Views all user information including roles and technician details.


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
            tech = Profile.objects.get(id=tech_id)
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
