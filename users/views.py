from decimal import Decimal, InvalidOperation

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from users.permissions import IsAdminUser
from users.serializers import LoginSerializer, RegisterSerializer

User = get_user_model()


class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data["role"] = "user"

        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TechnicianRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data["role"] = "technician"

        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Technician registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data["role"] = "admin"

        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Admin registered successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Validate input using serializer
        serializer = LoginSerializer(data=request.data)
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


class AdminUserListView(APIView):
    permission_classes = [
        IsAdminUser,
    ]

    def get(self, request):
        users = User.objects.all().values(
            "id",
            "username",
            "email",
            "mobile",
            "fullname",
            "role",
        )
        return Response({"users": list(users)}, status=status.HTTP_200_OK)
