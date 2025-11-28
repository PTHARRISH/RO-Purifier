from django.urls import path

from users.views import (
    AdminRegisterView,
    LoginView,
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
]
