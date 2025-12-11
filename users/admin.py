from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (
    Booking,
    Brand,
    Cart,
    CartItem,
    Category,
    Notification,
    Order,
    OrderItem,
    Product,
    ProductImage,
    ProductReview,
    ProductReviewImage,
    Profile,
    Tag,
    TechnicianReview,
    User,
)


# ----------------------------------------------------
# USER ADMIN
# ----------------------------------------------------
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


# ----------------------------------------------------
# PROFILE ADMIN
# ----------------------------------------------------
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "profile_status", "years_experience", "price_day")
    list_filter = ("profile_status", "tags")
    search_fields = ("user__username", "user__fullname")
    filter_horizontal = ("tags",)


# ----------------------------------------------------
# TAG ADMIN
# ----------------------------------------------------
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


# ----------------------------------------------------
# CATEGORY ADMIN
# ----------------------------------------------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)


# ----------------------------------------------------
# BRAND ADMIN
# ----------------------------------------------------
@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "created_at")
    search_fields = ("name", "category__name")
    list_filter = ("category",)


# ----------------------------------------------------
# PRODUCT IMAGES INLINE
# ----------------------------------------------------
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


# ----------------------------------------------------
# PRODUCT ADMIN
# ----------------------------------------------------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("product_name", "brand", "price", "status")
    search_fields = ("product_name", "brand__name")
    list_filter = ("status", "brand")
    inlines = [ProductImageInline]


# ----------------------------------------------------
# PRODUCT REVIEW IMAGES INLINE
# ----------------------------------------------------
class ProductReviewImageInline(admin.TabularInline):
    model = ProductReviewImage
    extra = 1


# ----------------------------------------------------
# PRODUCT REVIEW ADMIN
# ----------------------------------------------------
@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ("product", "user", "rating", "created_at")
    list_filter = ("rating",)
    search_fields = ("product__product_name", "user__username")
    inlines = [ProductReviewImageInline]


# ----------------------------------------------------
# BOOKING ADMIN
# ----------------------------------------------------
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
    search_fields = ("technician__user__fullname", "user__fullname")
    list_filter = ("service_status", "payment_done")


# ----------------------------------------------------
# CART ITEM INLINE
# ----------------------------------------------------
class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1


# ----------------------------------------------------
# CART ADMIN
# ----------------------------------------------------
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "is_active", "created_at")
    search_fields = ("user__username",)
    inlines = [CartItemInline]


# ----------------------------------------------------
# ORDER ITEM INLINE
# ----------------------------------------------------
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


# ----------------------------------------------------
# ORDER ADMIN
# ----------------------------------------------------
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total",
        "payment_method",
        "payment_done",
        "created_at",
    )
    list_filter = ("payment_method", "payment_done")
    search_fields = ("user__username", "user__fullname")
    inlines = [OrderItemInline]


# ----------------------------------------------------
# NOTIFICATION ADMIN
# ----------------------------------------------------
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("recipient", "title", "is_read", "created_at")
    list_filter = ("is_read",)
    search_fields = ("title", "recipient__user__fullname")


# ----------------------------------------------------
# TECHNICIAN REVIEW ADMIN
# ----------------------------------------------------
@admin.register(TechnicianReview)
class TechnicianReviewAdmin(admin.ModelAdmin):
    list_display = ("technician", "user", "booking", "rating", "created_at")
    list_filter = ("rating",)
    search_fields = ("technician__user__fullname", "user__fullname")
