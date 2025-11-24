# RO Water Purifier Platform

## 📌 About

RO Water Purifier is a web-based platform designed to help users browse and purchase RO water purifiers while also offering an easy and reliable way to book certified technicians for installation, servicing, and maintenance.

The platform supports **JWT Authentication**, allowing secure login and role-based access for:

* **Users** – browse products, manage profiles, track service history
* **Technicians** – view assigned jobs, update service status, manage earnings
* **Admin** – manage users, technician profiles, deactivate accounts, view payments & performance

---

## 📁 Project Folder Structure

```
RO/
├── .github/
│    └── workflows/
│        └── pre-commit.yml            # CI for pre-commit hooks
├── api/                     # URLs for API-only routing
│   ├── __init__.py
│   └── urls.py
│
├── backend/                          # Django project configuration
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py                   # Main project settings
│   ├── urls.py                       # Root URL configuration
│   └── wsgi.py
│
├── users/                            # App-level folder for user module
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── permissions.py
│   ├── urls.py
│   └── ... (other app files)
│
├── test/
│   └── test_users.py                 # User-related unit tests
│
├── .env                              # Environment variables
├── .gitignore
├── .pre-commit-config.yaml
├── .python-version
├── pyproject.toml
├── README.md
├── requirements.txt                  # Project dependencies
├── schema.yml
└── uv.lock
```

---

## 🔐 Authentication

This project uses **JWT Authentication** for secure and scalable user sessions.

### Roles & Permissions

* **User**

  * Login / Register
  * Manage profile
  * View purifier products
  * Book installation or service

* **Technician**

  * Login
  * View assigned service requests
  * Update work status
  * Check payment & service history

* **Admin**

  * Manage all users & technicians
  * View and deactivate user accounts
  * Access all profiles and service/payment records

---

## 🚀 Features

### ✔ User Features

* Register & Login (JWT)
* View and edit profile
* Browse RO water purifiers
* Book technicians for service
* View service history

### ✔ Technician Features

* Manage assigned jobs
* Update job progress
* View payment history

### ✔ Admin Features

* Manage all users & technicians
* View all profiles
* Deactivate/activate accounts
* Track technician work and payments

---

## 🛠 Tech Stack

* **Backend:** Django, Django REST Framework
* **Authentication:** JWT
* **Database:** PostgreSQL 
* **Tools:** Pre-commit, GitHub Actions, uv package manager

---

## ▶ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <repository-url>
cd RO
```

### 2️⃣ Create environment file

```
cp .env.example .env
```

Update with your settings.

### 3️⃣ Install dependencies

```
pip install -r requirements.txt
```

### 4️⃣ Apply migrations

```
python manage.py migrate
```

### 5️⃣ Run the development server

```
python manage.py runserver
```

---

## 🧪 Running Tests

```
pytest
```

Tests are located in `test/` directory.

---

## 📄 API Documentation

API schema is available in `schema.yml`.
You can integrate with **Swagger**, **ReDoc**, or **Postman**.

---

## 🤝 Contributing

Pull requests are welcome! Please ensure your code follows linting rules enforced by **pre-commit hooks**.

---

## 📜 License

This project is licensed under the MIT License.

---

## 📞 Support

For any queries or issues, feel free to raise an issue in the repository.
