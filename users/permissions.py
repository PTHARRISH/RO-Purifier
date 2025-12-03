from rest_framework.permissions import BasePermission


class AdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "admin"
            and request.user.is_superuser
        )


class TechnicianUser(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "technician"
            and request.user.is_staff
        )
