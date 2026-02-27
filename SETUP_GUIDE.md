# Setup Guide - YouTube Course Platform

## Step-by-Step Installation

### 1. Database Setup

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
```

Then run:
```sql
source C:/Users/krish/OneDrive/Desktop/COLLEGE FINAL PROJECT/backend/config/database.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. File → Open SQL Script
4. Select `backend/config/database.sql`
5. Execute the script (⚡ icon or Ctrl+Shift+Enter)

**Option C: Using phpMyAdmin**
1. Open phpMyAdmin
2. Click "Import" tab
3. Choose file: `backend/config/database.sql`
4. Click "Go"

### 2. Configure Backend Environment

Edit `backend/.env` file and update your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=youtube_course_db
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
```

### 3. Start Backend Server

Open Terminal/Command Prompt:

```bash
cd "C:\Users\krish\OneDrive\Desktop\COLLEGE FINAL PROJECT\backend"
npm start
```

You should see:
```
✅ MySQL Database Connected Successfully!
🚀 Server is running on port 5000
```

### 4. Start Frontend Application

Open a NEW Terminal/Command Prompt:

```bash
cd "C:\Users\krish\OneDrive\Desktop\COLLEGE FINAL PROJECT\frontend"
npm start
```

Browser will automatically open at `http://localhost:3000`

## Testing the Application

### Test 1: Registration with Validation

1. Go to http://localhost:3000/register
2. Try entering a weak password → Should show "Weak" indicator
3. Try using an existing username → Should show "Username already taken"
4. Try using an existing email → Should show "Email already registered"
5. Fill valid details:
   - Full Name: Test User
   - Username: testuser123
   - Email: test@example.com
   - Password: Test@123456
6. Should show success toast and redirect to dashboard

### Test 2: Login

1. Go to http://localhost:3000/login
2. Enter wrong credentials → Should show error toast
3. Enter correct credentials → Should redirect to dashboard

### Test 3: Course Browsing

1. Go to homepage
2. Browse courses
3. Click on category filters
4. Click "Enroll Now" on any course
5. Check dashboard to see enrolled courses

### Test 4: Real-time Validation

**Username Check:**
- Type "testuser123" in registration → Should show "Username already taken"
- Type "newuser456" → Should show "Username available!"

**Email Check:**
- Type "test@example.com" → Should show "Email already registered"
- Type "new@example.com" → Should show "Email available!"

**Password Strength:**
- Type "weak" → Red bar, "Weak"
- Type "Test@123" → Orange bar, "Moderate"
- Type "Test@123456" → Green bar, "Strong"

## Common Issues & Solutions

### Issue: Cannot connect to MySQL
**Solution:** 
- Make sure MySQL server is running
- Check credentials in `.env` file
- Verify database exists: `SHOW DATABASES;`

### Issue: CORS Error
**Solution:**
- Backend CORS is already configured for `http://localhost:3000`
- Make sure backend is running on port 5000
- Make sure frontend is running on port 3000

### Issue: Port already in use
**Solution:**
```bash
# For backend (port 5000)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# For frontend (port 3000)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: Module not found
**Solution:**
```bash
# Reinstall dependencies
cd backend
npm install

cd ../frontend
npm install
```

## Verification Checklist

- [ ] MySQL database created successfully
- [ ] Sample courses loaded (12 courses)
- [ ] Backend server running on port 5000
- [ ] Frontend app running on port 3000
- [ ] Registration works with validation
- [ ] Login works correctly
- [ ] Course browsing works
- [ ] Enrollment works
- [ ] Dashboard shows enrolled courses
- [ ] Toast notifications appear
- [ ] No CORS errors in browser console

## Next Steps

After successful setup and testing:
1. Create more test users
2. Enroll in multiple courses
3. Test all validation scenarios
4. Check browser console for any errors
5. Review the application flow

## Support

If you encounter any issues:
1. Check browser console for errors (F12)
2. Check backend terminal for errors
3. Verify MySQL connection
4. Ensure all dependencies are installed
