from django.urls import path

from users.views import (
    AddToCartView,
    AdminDashboardView,
    AdminRegisterView,
    AdminUserDetailView,
    CartDetailView,
    CheckoutView,
    DeleteAccountView,
    HomeView,
    LoginView,
    ProductDetailView,
    ProductListView,
    ProductReviewCreateUpdateView,
    ProfileView,
    RemoveCartItemView,
    TechnicianBookingsView,
    TechnicianNotificationsView,
    TechnicianRegisterView,
    TechnicianReviewView,
    UpdateCartItemView,
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
    path("home/", HomeView.as_view(), name="home-view"),
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
    path("technician/review/<int:booking_id>/", TechnicianReviewView.as_view()),
    path("admin/dashboard/", AdminDashboardView.as_view(), name="admin-dashboard"),
    path(
        "admin/users/<int:user_id>/",
        AdminUserDetailView.as_view(),
        name="admin-user-detail",
    ),
    path(
        "technician/bookings/",
        TechnicianBookingsView.as_view(),
        name="technician-bookings",
    ),
    path(
        "technician/notifications/",
        TechnicianNotificationsView.as_view(),
        name="technician-notifications",
    ),
    path("cart/add/", AddToCartView.as_view(), name="cart-add"),
    path("cart/", CartDetailView.as_view(), name="cart-detail"),
    path(
        "cart/item/<int:item_id>/",
        UpdateCartItemView.as_view(),
        name="cart-item-update",
    ),
    path(
        "cart/item/<int:item_id>/remove/",
        RemoveCartItemView.as_view(),
        name="cart-item-remove",
    ),
    path("cart/checkout/", CheckoutView.as_view(), name="cart-checkout"),
    path("delete-account/", DeleteAccountView.as_view(), name="delete-account"),
]
