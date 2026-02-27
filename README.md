# YouTube Course Platform

A full-stack web application for browsing and enrolling in YouTube courses with user authentication and MySQL database.

## Features

- 🔐 User Authentication (Register/Login)
- ✅ Real-time Form Validation
- 📚 Course Browsing and Filtering
- 🎯 Course Enrollment
- 👤 User Dashboard
- 🎨 Beautiful, Interactive UI
- 🔒 Password Strength Validation
- ✉️ Email & Username Uniqueness Check
- 🎉 Toast Notifications

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcryptjs
- CORS

### Frontend
- React (Create React App)
- React Router
- Axios
- React Hot Toast
- CSS3 with Animations

## Project Structure

```
COLLEGE FINAL PROJECT/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── database.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   └── courseController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── courses.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   ├── Hero.js
    │   │   ├── Hero.css
    │   │   ├── CourseCard.js
    │   │   └── CourseCard.css
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Home.css
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Register.css
    │   │   ├── Dashboard.js
    │   │   └── Dashboard.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Database Setup

1. Start MySQL server
2. Run the SQL script to create database and tables:

```bash
mysql -u root -p < backend/config/database.sql
```

Or manually execute the SQL file in MySQL Workbench/phpMyAdmin.

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=youtube_course_db
DB_PORT=3306
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Application will open on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/check-username` - Check username availability
- `POST /api/auth/check-email` - Check email availability
- `GET /api/auth/me` - Get current user (Protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/category/:category` - Get courses by category
- `GET /api/courses/search/:query` - Search courses
- `POST /api/courses/enroll` - Enroll in course (Protected)
- `GET /api/courses/my/enrolled` - Get user's enrolled courses (Protected)

## Validation Features

### Registration
- ✅ Username: 3-50 characters, alphanumeric + underscore only
- ✅ Real-time username availability check
- ✅ Email: Valid email format
- ✅ Real-time email availability check
- ✅ Password: Minimum 8 characters, must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- ✅ Password strength indicator (Weak/Moderate/Strong)

### Login
- ✅ Email validation
- ✅ Password required

## License

MIT
