from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Booking, Profile, Review, Tag, User


# ---------------------------
# Custom User Admin
# ---------------------------
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("username", "fullname", "role", "mobile", "is_active")
    list_filter = ("role", "is_active", "is_staff")
    search_fields = ("username", "fullname", "mobile")

    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional Info",
            {
                "fields": (
                    "fullname",
                    "role",
                    "address",
                    "mobile",
                )
            },
        ),
    )


# ---------------------------
# Profile Admin
# ---------------------------
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "profile_status", "years_experience", "price_hour")
    list_filter = ("profile_status", "tags")
    search_fields = ("user__username", "user__fullname")

    filter_horizontal = ("tags",)  # for ManyToManyField


# ---------------------------
# Tag Admin
# ---------------------------
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


# ---------------------------
# Review Admin
# ---------------------------
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("technician", "reviewer", "rating", "created_at")
    list_filter = ("rating",)
    search_fields = ("technician__user__fullname", "reviewer__fullname")


# ---------------------------
# Booking Admin
# ---------------------------
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "technician",
        "user",
        "date_time_start",
        "payment_done",
        "service_status",
    )
    list_filter = ("service_status", "payment_done")
    search_fields = ("technician__user__fullname", "user__fullname")
