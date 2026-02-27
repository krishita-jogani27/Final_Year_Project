# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup MySQL Database

**Important:** You need to configure your MySQL password first!

1. Open `backend/.env` file
2. Update this line with your MySQL password:
   ```
   DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
   ```

3. Create the database by running the SQL script:

**Option A - MySQL Command Line:**
```bash
mysql -u root -p < "C:\Users\krish\OneDrive\Desktop\COLLEGE FINAL PROJECT\backend\config\database.sql"
```

**Option B - MySQL Workbench:**
- Open MySQL Workbench
- File → Open SQL Script → Select `backend/config/database.sql`
- Execute (⚡ icon)

### Step 2: Start Backend Server

```bash
cd "C:\Users\krish\OneDrive\Desktop\COLLEGE FINAL PROJECT\backend"
npm start
```

✅ You should see: "MySQL Database Connected Successfully!"

### Step 3: Start Frontend App

Open a NEW terminal:

```bash
cd "C:\Users\krish\OneDrive\Desktop\COLLEGE FINAL PROJECT\frontend"
npm start
```

✅ Browser will open at http://localhost:3000

---

## 🎯 Test the Application

### 1. Register a New User
- Go to http://localhost:3000/register
- Try weak password → See "Weak" indicator
- Use strong password: `Test@123456`
- Watch real-time validation!

### 2. Browse Courses
- Homepage shows 12 courses
- Filter by category
- Click "Enroll Now"

### 3. View Dashboard
- See your enrolled courses
- Track your progress

---

## 🎨 Features to Try

✨ **Real-time Validation**
- Username availability check
- Email uniqueness check
- Password strength indicator

🎨 **Beautiful UI**
- Animated gradient backgrounds
- Smooth hover effects
- Toast notifications

🔐 **Security**
- Password hashing
- JWT authentication
- Protected routes

---

## ❓ Need Help?

See [SETUP_GUIDE.md](file:///C:/Users/krish/OneDrive/Desktop/COLLEGE%20FINAL%20PROJECT/SETUP_GUIDE.md) for detailed instructions and troubleshooting.

See [walkthrough.md](file:///C:/Users/krish/.gemini/antigravity/brain/ae78ebcc-9ddf-4377-ba73-8c6306ee46cb/walkthrough.md) for complete application flow and architecture.
