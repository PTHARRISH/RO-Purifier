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
├── api/                               # API-only routing
│   ├── __init__.py
│   └── urls.py
│
├── backend/                           # Django project configuration
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py                    # Main project settings
│   ├── urls.py                        # Root URL configuration
│   └── wsgi.py
│
├── users/                             # App-level folder
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── permissions.py
│   ├── urls.py
│   └── ... (other app files)
│
├── test/
│   └── test_users.py                  # Tests
│
├── .env                               # Environment variables
├── .gitignore
├── .pre-commit-config.yaml
├── .python-version
├── pyproject.toml
├── README.md
├── requirements.txt                   # Project dependencies
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
  * View and deactivate accounts
  * Access profiles and service/payment records

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
* Activate/Deactivate accounts
* Track technician work & payments

---

## 🛠 Tech Stack

* **Backend:** Django, Django REST Framework
* **Authentication:** JWT
* **Database:** PostgreSQL
* **Tools:** Pre-commit, GitHub Actions, **uv package manager**

---

## 🧰 Prerequisites for New Developers

Before setting up the project, ensure the following are installed on your system:

### ✔ Install Python

This project uses the Python version defined in `.python-version`.
If you don't have it installed, use **pyenv** or download the correct version manually.

```
# Example (using pyenv)
pyenv install $(cat .python-version)
pyenv local $(cat .python-version)
```

### ✔ Install uv (Python package manager)

If uv is not installed, install it with:

```
pip install uv
```

(Or install via official instructions: [https://docs.astral.sh/uv/](https://docs.astral.sh/uv/))

### ✔ Install PostgreSQL

Download & install PostgreSQL from the official website.
Create a database using the same name provided in your `.env` file:

```
createdb RO_db
```

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

Update values according to your setup.

### 3️⃣ Install dependencies using uv

```
uv sync
```

(or install fresh)

```
uv pip install -r requirements.txt
```

### 4️⃣ Apply migrations

```
python manage.py migrate
```

### 5️⃣ Start the development server

```
python manage.py runserver
```

---

## 🧪 Running Tests

```
pytest
```

Tests are located inside the `test/` directory.

---

## 📄 API Documentation

API schema is available in `schema.yml`.
You may generate API docs using **Swagger**, **ReDoc**, or import into **Postman**.

---

## 🧩 Sample `.env` File

```
SECRET_KEY=django-insecure-m72oe!!4!@1o)6b1-exojf1y1-4d+j%l+gmu5xv0dzf+a5ys$s
DEBUG=True

DB_NAME=RO_db
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=127.0.0.1
DB_PORT=5432

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=test@gmail.com
EMAIL_HOST_PASSWORD=test
```

SECRET_KEY=django-insecure-m72oe!!4!@1o)6b1-exojf1y1-4d+j%l+gmu5xv0dzf+a5ys$s
DEBUG=True

DB_NAME=RO_db
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=127.0.0.1
DB_PORT=5432

RATE_LIMIT_ANON=100/hour
RATE_LIMIT_USER=1000/hour

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=[test@gmail.com](mailto:test@gmail.com)
EMAIL_HOST_PASSWORD=test

```

---

## 🤝 Contributing
Pull requests are welcome! Make sure all code follows linting rules enforced by **pre-commit hooks**.

---

## 📜 License
This project is licensed under the MIT License.

---

## 📞 Support
For any queries or issues, feel free to raise an issue in the repository.

```
