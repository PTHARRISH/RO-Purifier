import pytest
from rest_framework.test import APIClient

from users.models import User


@pytest.mark.django_db
class TestUserAuthAPI:
    @pytest.fixture
    def client(self):
        return APIClient()

    def test_user_registration(self, client):
        url = "/api/register/user/"
        payload = {
            "fullname": "John Doe",
            "username": "johndoe",
            "email": "johndoe@example.com",
            "mobile": "1234567890",
            "password": "password123",
            "confirm_password": "password123",
        }
        response = client.post(url, payload, format="json")
        assert response.status_code == 201
        assert response.data["message"] == "User registered successfully."
        assert User.objects.filter(username="johndoe").exists()

    def test_technician_registration(self, client):
        url = "/api/register/technician/"
        payload = {
            "fullname": "Tech User",
            "username": "techuser",
            "email": "tech@example.com",
            "mobile": "1234567891",
            "password": "password123",
            "confirm_password": "password123",
        }
        response = client.post(url, payload, format="json")
        assert response.status_code == 201
        assert response.data["message"] == "Technician registered successfully."
        user = User.objects.get(username="techuser")
        assert user.role == "technician"

    def test_admin_registration(self, client):
        url = "/api/register/admin/"
        payload = {
            "fullname": "Admin User",
            "username": "adminuser",
            "email": "admin@example.com",
            "mobile": "1234567892",
            "password": "password123",
            "confirm_password": "password123",
        }
        response = client.post(url, payload, format="json")
        assert response.status_code == 201
        assert response.data["message"] == "Admin registered successfully."
        user = User.objects.get(username="adminuser")
        assert user.role == "admin"

    def test_login_with_username(self, client):
        user = User.objects.create_user(
            username="loginuser",
            email="login@example.com",
            mobile="1234567893",
            password="password123",
            fullname="Login User",
            role="user",
        )
        url = "/api/login/"
        payload = {"identifier": "loginuser", "password": "password123"}
        response = client.post(url, payload, format="json")
        assert response.status_code == 200
        assert response.data["username"] == user.username

    def test_login_with_email(self, client):
        user = User.objects.create_user(
            username="emailuser",
            email="email@example.com",
            mobile="1234567894",
            password="password123",
            fullname="Email User",
            role="user",
        )
        url = "/api/login/"
        payload = {"identifier": "email@example.com", "password": "password123"}
        response = client.post(url, payload, format="json")
        assert response.status_code == 200
        assert response.data["username"] == user.username

    def test_login_with_mobile(self, client):
        user = User.objects.create_user(
            username="mobileuser",
            email="mobile@example.com",
            mobile="1234567895",
            password="password123",
            fullname="Mobile User",
            role="user",
        )
        url = "/api/login/"
        payload = {"identifier": "1234567895", "password": "password123"}
        response = client.post(url, payload, format="json")
        assert response.status_code == 200
        assert response.data["username"] == user.username

    def test_login_invalid_credentials(self, client):
        url = "/api/login/"
        payload = {"identifier": "nonexistent", "password": "wrongpass"}
        response = client.post(url, payload, format="json")
        assert response.status_code == 401
        assert "error" in response.data
