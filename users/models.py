from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [
        ("user", "User"),
        ("admin", "Admin"),
        ("technician", "Technician"),
    ]
    fullname = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    address = models.JSONField(blank=True, null=True)
    phone_no = models.CharField(max_length=20, blank=True, default="")
    mobile_no = models.CharField(max_length=20, blank=True, default="")


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return str(self.name)


class Profile(models.Model):
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
    available_days = models.JSONField(blank=True, null=True)  # Calendar availability data
    price_hour = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    price_day = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return str(self.user.username)


class Review(models.Model):
    technician = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="reviews")
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField()
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.technician.user.username) + " - " + str(self.rating)


class Booking(models.Model):
    SERVICE_STATUS = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]
    technician = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="bookings")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings")
    date_time_start = models.DateTimeField()
    date_time_end = models.DateTimeField()
    address = models.JSONField(blank=True, null=True)
    payment_done = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    service_status = models.CharField(max_length=20, choices=SERVICE_STATUS, default="pending")

    def __str__(self):
        return f"Booking {self.id} - {self.technician.user.username} for {self.user.username}"
