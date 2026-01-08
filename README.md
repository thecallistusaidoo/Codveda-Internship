# 🔐 User Management System (Role-Based Access Control)

A full-stack **User Management System** built as part of my **Codveda Internship**, demonstrating secure authentication, authorization, and admin-controlled user operations using modern web technologies.

---

## 🚀 Live Overview

This application allows **Admins** to manage users while enforcing strict role-based permissions for **non-admin users**.

### 👥 Roles

* **Admin** – Can add, edit, and delete users
* **User** – Can view users only (no edit/delete access)

All permissions are enforced on **both frontend and backend**.

---

## 🛠️ Tech Stack

### Frontend

* React (Hooks)
* CSS (custom responsive styling)
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (JSON Web Tokens)
* bcryptjs

---

## ✨ Features

* 🔐 JWT-based authentication
* 🛡️ Role-based authorization (Admin vs User)
* 🔄 Persistent login & role state on refresh
* 🚫 Protected backend routes with middleware
* 🧠 Token decoding for role detection
* 🎨 Clean, responsive UI
* 🔕 Disabled UI actions for non-admins
* 📱 Mobile-friendly layout

---

## 📂 Project Structure

```
frontend/
 ├─ src/
 │  ├─ components/
 │  │  ├─ Login.jsx
 │  │  ├─ UserForm.jsx
 │  │  └─ UserList.jsx
 │  ├─ App.jsx
 │  └─ App.css

backend/
 ├─ Models/
 │  └─ user.js
 ├─ Routes/
 │  └─ userRoutes.js
 ├─ middleware/
 │  ├─ authMiddleware.js
 │  └─ roleMiddleware.js
 └─ index.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a MongoDB database (local or Atlas) and update the connection string in `index.js`.

Start the backend server:

```bash
node index.js
```

Server runs on: `http://localhost:3000`

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:5173` (or default React port)

---

## 🔑 Authentication Flow

1. User logs in with email & password
2. Backend validates credentials
3. JWT token is issued containing user role
4. Token is stored in `localStorage`
5. Frontend decodes token to determine UI permissions
6. Backend verifies token on every protected request

---

## 🧠 Authorization Logic

### Backend

* `authMiddleware` → validates JWT
* `roleMiddleware('admin')` → restricts admin-only routes

### Frontend

* Admin-only buttons rendered conditionally
* Edit/Delete disabled for non-admin users

---

## 🧪 Sample Admin and User Credentials

*(For testing purposes)*

```
Email: admin@test.com
Password: admin123
Role: admin
```
```
Email: intern@test.com
Password: intern123
Role: user
```

---

## 📸 Screenshots & Demo

Screenshots and a demo video are available on my **LinkedIn profile**.

---

## 📌 Lessons Learned

* Implementing real-world authentication & authorization
* Handling JWT persistence and refresh behavior
* Preventing UI and backend security loopholes
* Debugging state sync issues between frontend and backend
* Designing admin-safe interfaces

---

## 👨‍💻 Author

**Callistus Lawrence Aidoo**
BSc Data Science & Analytics

---

## ⭐ Feedback

If you find this project useful, feel free to **star the repository**, clone it, or suggest improvements.

Happy coding 🚀
