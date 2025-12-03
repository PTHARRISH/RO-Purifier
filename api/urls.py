from django.urls import path

from users.views import (
    AdminDashboardView,
    AdminRegisterView,
    AdminUserDetailView,
    LoginView,
    ProductDetailView,
    ProductListView,
    ProductReviewCreateUpdateView,
    TechnicianRegisterView,
    UserRegisterView,
)

urlpatterns = [
    path("register/user/", UserRegisterView.as_view(), name="user-register"),
    path(
        "register/technician/",
        TechnicianRegisterView.as_view(),
        name="technician-register",
    ),
    path("register/admin/", AdminRegisterView.as_view(), name="admin-register"),
    path("login/", LoginView.as_view(), name="login"),
    path("products/", ProductListView.as_view()),
    path("products/<int:product_id>/", ProductDetailView.as_view()),
    path("products/<int:product_id>/review/", ProductReviewCreateUpdateView.as_view()),
    path("admin/dashboard/", AdminDashboardView.as_view(), name="admin-dashboard"),
    path(
        "admin/users/<int:user_id>/",
        AdminUserDetailView.as_view(),
        name="admin-user-detail",
    ),
]
