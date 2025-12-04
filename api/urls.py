from django.urls import path

from users.views import (
    AdminDashboardView,
    AdminRegisterView,
    AdminUserDetailView,
    DeleteAccountView,
    LoginView,
    ProductDetailView,
    ProductListView,
    ProductReviewCreateUpdateView,
    ProfileView,
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
    path("profile/<str:username>/", ProfileView.as_view(), name="profile_detail"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path(
        "products/<int:product_id>/", ProductDetailView.as_view(), name="product-detail"
    ),
    path(
        "products/<int:product_id>/review/",
        ProductReviewCreateUpdateView.as_view(),
        name="product-review",
    ),
    path("admin/dashboard/", AdminDashboardView.as_view(), name="admin-dashboard"),
    path(
        "admin/users/<int:user_id>/",
        AdminUserDetailView.as_view(),
        name="admin-user-detail",
    ),
    path("delete-account/", DeleteAccountView.as_view(), name="delete-account"),
]
