# CourseNest Backend

CourseNest is a backend system for a course selling platform. It provides secure authentication, course management, and course purchasing functionality for users and admins. This repository contains only the backend implementation built using Node.js, Express.js, and MongoDB.

---

# Features

## Authentication

* User signup
* User signin
* Admin signup
* Admin signin
* JWT-based authentication
* Password hashing using bcrypt

## Admin Functionalities

* Create new courses
* Update existing courses
* View all courses created by admin
* Secure admin-only endpoints using middleware

## User Functionalities

* View available courses
* Purchase courses
* View purchased courses
* Secure user-only endpoints using middleware

## Security

* Password hashing using bcrypt
* JWT authentication
* Environment variables for sensitive data
* Protected routes using middleware

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* dotenv

---

# Project Structure

```
CourseNest-Backend/
│
├── middleware/
│   ├── admin.js
│   └── user.js
│
├── routes/
│   ├── admin.js
│   ├── user.js
│   └── course.js
│
├── node_modules/
│
├── .env
├── .env.example
├── .gitignore
├── db.js
├── index.js
├── package.json
├── package-lock.json
└── readme.md
```

---

# Installation and Setup

## 1. Clone the repository

```
git clone https://github.com/yourusername/CourseNest-Backend.git
cd CourseNest-Backend
```

## 2. Install dependencies

```
npm install
```

## 3. Create .env file

Create a `.env` file in the root directory:

```
PORT=3000

MONGODB_URL=your_mongodb_connection_string

JWT_USER_SECRET=your_user_jwt_secret

JWT_ADMIN_SECRET=your_admin_jwt_secret
```

---

## 4. Start the server

```
node index.js
```

or using nodemon

```
npx nodemon index.js
```

Server will run at:

```
http://localhost:3000
```

---


# Authentication

CourseNest uses JWT authentication.

JWT is required for protected routes.

JWT must be sent in headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

# API Endpoints

Base URL:

```
http://localhost:3000
```

---

# Database Connection

Handled in:

```
db.js
```

Uses mongoose to connect MongoDB Atlas.

---

# Environment Variables

```
PORT
MONGODB_URL
JWT_USER_SECRET
JWT_ADMIN_SECRET
```

Never commit .env file.

---

# Security Features

* Password hashing using bcrypt
* JWT authentication
* Protected routes
* Environment variable protection

---

# Current Status

Backend: Complete
Frontend: Not implemented yet

---

# Future Improvements

* Frontend integration (React)
* Payment gateway integration
* Course categories
* Course ratings and reviews
* Profile management
* Refresh tokens

---

# Author

Navneet Shahi

---

# License

This project is licensed for learning and educational purposes.

---

# CourseNest Backend Summary

CourseNest backend provides:

* Secure authentication system
* Admin course management
* User course purchasing
* JWT protected routes
* MongoDB database integration
* Clean and scalable backend structure

---
