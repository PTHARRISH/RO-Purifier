import re

from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.models import (
    Booking,
    Brand,
    Product,
    ProductImage,
    ProductReview,
    Profile,
    Tag,
)

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "fullname",
            "username",
            "email",
            "mobile",
            "password",
            "confirm_password",
            "role",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    # ===== VALIDATIONS =====
    def validate_mobile(self, value):
        if not value.isdigit() or len(value) < 10:
            raise serializers.ValidationError(
                "Mobile number must be at least 10 digits and numeric."
            )
        if User.objects.filter(mobile=value).exists():
            raise serializers.ValidationError("Mobile number already exists.")
        return value

    def validate_email(self, value):
        regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        if not re.match(regex, value):
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long."
            )
        return value

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        password = validated_data.pop("password")
        user = User(**validated_data)
        if validated_data.get("role") == "admin":
            user.is_superuser = True
        if validated_data.get("role") == "technician":
            user.is_staff = True
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(required=True, allow_blank=False, min_length=8)

    def validate_identifier(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError(
                "Username, email, or mobile number is required."
            )
        return value.strip()

    def validate_password(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Password is required.")
        return value

    def create(self, validated_data):
        return validated_data  # Login does not create objects

    def update(self, instance, validated_data):
        return instance  # Login does not update objects


class UserProfileSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(source="user.fullname", required=False)

    class Meta:
        model = Profile
        fields = [
            "fullname",
            "bio",
            "avatar",
            "profile_status",
        ]
        read_only_fields = ["profile_status"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        if "fullname" in user_data:
            instance.user.fullname = user_data["fullname"]
            instance.user.save()

        return super().update(instance, validated_data)


class TechnicianProfileSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(source="user.fullname", required=False)
    tags = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, required=False
    )

    class Meta:
        model = Profile
        fields = [
            "fullname",
            "bio",
            "avatar",
            "profile_status",
            "years_experience",
            "months_experience",
            "tags",
            "available_days",
            "price_hour",
            "price_day",
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        if "fullname" in user_data:
            instance.user.fullname = user_data["fullname"]
            instance.user.save()

        tags = validated_data.pop("tags", None)
        profile = super().update(instance, validated_data)

        if tags is not None:
            profile.tags.set(tags)

        return profile


class AdminProfileSerializer(UserProfileSerializer):
    pass


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]


class BrandSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Brand
        fields = ["id", "name", "category"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class ProductReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = ProductReview
        fields = ["id", "username", "rating", "review_text", "image", "created_at"]
        read_only_fields = ["username", "created_at"]


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    tags = TagSerializer(many=True)
    images = ProductImageSerializer(many=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "description",
            "price",
            "tags",
            "status",
            "technical_specifications",
            "brand",
            "images",
            "reviews",
            "average_rating",
            "url",
        ]

    def get_url(self, obj):
        return f"/products/{obj.id}/"


class TechnicianSummarySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    fullname = serializers.CharField(source="user.fullname")
    avatar = serializers.SerializerMethodField()

    avg_rating = serializers.FloatField()
    total_bookings = serializers.IntegerField()
    earnings = serializers.FloatField()
    unique_users = serializers.IntegerField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "username",
            "fullname",
            "avatar",
            "profile_status",
            "years_experience",
            "months_experience",
            "avg_rating",
            "total_bookings",
            "unique_users",
            "earnings",
        ]

    def get_avatar(self, obj):
        return obj.avatar.url if obj.avatar else None


class BookingDetailSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            "id",
            "date_time_start",
            "date_time_end",
            "service_status",
            "payment_done",
            "price",
            "address",
            "user",
        ]

    def get_user(self, obj):
        u = obj.user
        return {"id": u.id, "username": u.username, "fullname": u.fullname}


class AdminUserDetailSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    total_bookings = serializers.IntegerField()
    total_spent = serializers.FloatField()
    last_booking = serializers.DateTimeField()
    avg_rating = serializers.FloatField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "fullname",
            "email",
            "avatar",
            "date_joined",
            "total_bookings",
            "total_spent",
            "last_booking",
            "avg_rating",
        ]

    def get_avatar(self, obj):
        profile = getattr(obj, "profile", None)
        return profile.avatar.url if profile and profile.avatar else None


class UserBookingHistorySerializer(serializers.ModelSerializer):
    technician = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = [
            "id",
            "service",
            "service_status",
            "price",
            "payment_done",
            "date_time_start",
            "date_time_end",
            "technician",
        ]

    def get_technician(self, obj):
        if not obj.technician:
            return None

        t = obj.technician.user
        return {
            "id": t.id,
            "username": t.username,
            "fullname": t.fullname,
        }
