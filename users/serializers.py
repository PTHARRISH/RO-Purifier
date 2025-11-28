import re

from django.contrib.auth import get_user_model
from rest_framework import serializers

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
