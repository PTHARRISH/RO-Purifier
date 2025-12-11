from decimal import ROUND_HALF_UP, Decimal

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

PAYMENT_CHOICES = [
    ("COD", "Cash on Delivery"),
    ("UPI", "UPI"),
    ("CARD", "Card"),
]


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    ROLE_CHOICES = [
        ("user", "User"),
        ("admin", "Admin"),
        ("technician", "Technician"),
    ]
    fullname = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    address = models.JSONField(blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, default="")


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return str(self.name)


class Profile(TimestampedModel):
    PROFILE_STATUS = [
        ("inactive", "Inactive"),
        ("pending", "Pending"),
        ("active", "Active"),
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, default="")
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    profile_status = models.CharField(max_length=20, choices=PROFILE_STATUS)

    # Technician-specific fields
    years_experience = models.PositiveIntegerField(blank=True, null=True)
    months_experience = models.PositiveIntegerField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)  # Expertise categories
    available_days = models.JSONField(
        blank=True, null=True
    )  # Calendar availability data
    price_hour = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    price_day = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )

    def __str__(self):
        return str(self.user)


class Category(TimestampedModel):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Brand(TimestampedModel):
    name = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="brands",
    )

    def __str__(self):
        return str(self.name)


class Product(TimestampedModel):
    product_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tags = models.ManyToManyField(Tag, blank=True)
    status = models.CharField(
        choices=[("stock", "Stock"), ("out_of_stock", "Out of Stock")], max_length=20
    )
    technical_specifications = models.JSONField(blank=True, null=True)
    brand = models.ForeignKey(
        Brand,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="products",
    )

    def __str__(self):
        return str(self.product_name)

    @property
    def average_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            return round(sum([r.rating for r in reviews]) / reviews.count(), 2)
        return 0


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="products/gallery/")

    def __str__(self):
        return f"Image for {self.product.product_name}"


class ProductReview(TimestampedModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_reviews"
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    review_text = models.TextField(blank=True)
    image = models.ImageField(upload_to="reviews/", blank=True, null=True)

    class Meta:
        unique_together = ("user", "product")  # One review per user

    def __str__(self):
        return f"{self.user.username} - {self.product.product_name}"


class Review(TimestampedModel):
    technician = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="reviews"
    )
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField()
    review_text = models.TextField()

    def __str__(self):
        return str(self.technician) + " - " + str(self.rating)


class Booking(models.Model):
    SERVICE_STATUS = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]
    technician = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="bookings"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings"
    )
    date_time_start = models.DateTimeField()
    date_time_end = models.DateTimeField()
    address = models.JSONField(blank=True, null=True)
    payment_done = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    service_status = models.CharField(
        max_length=20, choices=SERVICE_STATUS, default="pending"
    )

    def __str__(self):
        return f"Booking {self.pk} - {self.technician} for {self.user}"


class Cart(TimestampedModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="carts"
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Cart {self.pk} - {self.user.username}"

    @property
    def total(self):
        total = sum([item.total_price for item in self.items.all()])
        return Decimal(total).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("cart", "product")

    def __str__(self):
        return f"{self.product.product_name} x {self.quantity}"

    @property
    def total_price(self):
        return (Decimal(self.unit_price) * Decimal(self.quantity)).quantize(
            Decimal("0.01"), rounding=ROUND_HALF_UP
        )


class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders"
    )
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    address = models.JSONField(blank=True, null=True)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    payment_done = models.BooleanField(default=False)
    technician = models.ForeignKey(
        "Profile", on_delete=models.SET_NULL, null=True, blank=True
    )
    technician_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    booking = models.OneToOneField(
        "Booking",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="order",
    )
    notes = models.TextField(blank=True, default="")

    def __str__(self):
        return f"Order {self.pk} - {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey("Product", on_delete=models.SET_NULL, null=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    line_total = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"OrderItem {self.pk} for Order {self.order.pk}"


class Notification(TimestampedModel):
    recipient = models.ForeignKey(
        "Profile", on_delete=models.CASCADE, related_name="notifications"
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    metadata = models.JSONField(blank=True, null=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification to {self.recipient} - {self.title}"
