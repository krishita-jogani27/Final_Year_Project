# 🔐 Test Credentials & Testing Guide

## 🚀 Quick Start

### Website URL
**Frontend**: http://localhost:3000

---

## 👤 Demo Account (Pre-loaded)

### Login Credentials
```
Email: demo@example.com
Password: Demo@123456
```

**Note**: Yeh account pehle se mock data mein hai. Directly login kar sakte ho!

---

## 🆕 New Account Registration

### Test Registration Kaise Karein

#### Example 1: Valid Registration
```
Full Name: Krish Kumar
Username: krish123
Email: krish@example.com
Password: Krish@123456
```

#### Example 2: Another User
```
Full Name: Priya Sharma
Username: priya_sharma
Email: priya@example.com
Password: Priya@123456
```

#### Example 3: Tech Enthusiast
```
Full Name: Rahul Verma
Username: rahul_dev
Email: rahul@example.com
Password: Rahul@123456
```

---

## ✅ Password Requirements

**Strong Password Format**:
- ✅ Minimum 8 characters
- ✅ At least 1 uppercase letter (A-Z)
- ✅ At least 1 lowercase letter (a-z)
- ✅ At least 1 number (0-9)
- ✅ At least 1 special character (@$!%*?&)

**Examples of Strong Passwords**:
- `Test@123456` ✅
- `Krish@2024` ✅
- `MyPass@123` ✅
- `Secure@Pass1` ✅

**Examples of Weak Passwords** (Will be rejected):
- `password` ❌ (no uppercase, number, special char)
- `12345678` ❌ (no letters, special char)
- `Test1234` ❌ (no special char)
- `test@123` ❌ (no uppercase)

---

## 🧪 Complete Testing Checklist

### 1️⃣ Registration Testing

**Test Case 1: Weak Password**
```
Username: testuser
Email: test@test.com
Password: weak
Result: ❌ Red bar, "Weak" indicator, error toast
```

**Test Case 2: Username Already Taken**
```
Username: demouser (already exists)
Result: ❌ Shows "Username already taken" with ✗ icon
```

**Test Case 3: Email Already Registered**
```
Email: demo@example.com (already exists)
Result: ❌ Shows "Email already registered" with ✗ icon
```

**Test Case 4: Successful Registration**
```
Full Name: Test User
Username: newuser123
Email: newuser@test.com
Password: Test@123456
Result: ✅ Green bar, "Strong", success toast, redirect to dashboard
```

---

### 2️⃣ Login Testing

**Test Case 1: Wrong Credentials**
```
Email: wrong@example.com
Password: WrongPass@123
Result: ❌ Error toast "Invalid email or password"
```

**Test Case 2: Correct Credentials (Demo Account)**
```
Email: demo@example.com
Password: Demo@123456
Result: ✅ Success toast, redirect to dashboard
```

**Test Case 3: Newly Registered User**
```
Use credentials from successful registration
Result: ✅ Login successful
```

---

### 3️⃣ Course Browsing

**Available Courses**: 6 courses
1. Complete Web Development Bootcamp
2. JavaScript - The Complete Guide
3. React - The Complete Guide
4. Python for Everybody
5. Machine Learning A-Z
6. Node.js - The Complete Guide

**Test Actions**:
- ✅ Click category filters (Web Development, Programming, etc.)
- ✅ Hover over course cards (see overlay effect)
- ✅ Click "Watch Now" (opens YouTube)
- ✅ Click "Enroll Now" (without login → shows error)

---

### 4️⃣ Course Enrollment

**Steps**:
1. Login first (use demo account or register)
2. Go to homepage
3. Click "Enroll Now" on any course
4. ✅ Success toast appears
5. Go to Dashboard
6. ✅ Course appears in "My Courses"

**Test Multiple Enrollments**:
- Enroll in 2-3 different courses
- Check dashboard shows all enrolled courses
- Try enrolling in same course again → Shows "Already enrolled"

---

### 5️⃣ Career Assessment Testing

**Access**: Click "Career Assessment" in navbar

#### Assessment Flow:
1. **Intro Page**: Read features, click "Start Assessment"
2. **Quiz**: Answer 10 questions honestly
3. **Results**: View recommendations

#### Test Scenarios:

**Scenario 1: Technology Path**
Answer questions favoring:
- Analytical thinking
- Technical skills
- Building apps
- Logical problems
- Independent work
Result: Should recommend "Technology & Software Development"

**Scenario 2: Creative Path**
Answer questions favoring:
- Creative activities
- Design challenges
- Visual learning
- Collaborative work
Result: Should recommend "UI/UX Design & Creative"

**Scenario 3: Management Path**
Answer questions favoring:
- Leadership
- Managing projects
- Communication
- Team work
Result: Should recommend "Project Management & Leadership"

---

### 6️⃣ UI/UX Testing

**Check These Elements**:

✅ **Navbar**:
- Gradient background
- Hover effects on links
- Login/Logout state changes

✅ **Hero Section**:
- Animated gradient orbs (floating)
- Smooth button hover effects
- Statistics display

✅ **Course Cards**:
- Hover overlay appears
- Scale animation on hover
- Enroll button gradient

✅ **Forms (Login/Register)**:
- Glassmorphism background
- Real-time validation icons (⏳ → ✓/✗)
- Password strength bar (Red/Orange/Green)
- Smooth input focus effects

✅ **Assessment**:
- Progress bar animation
- Question transitions
- Option hover effects
- Results page animations

✅ **Toast Notifications**:
- Success (green icon)
- Error (red icon)
- Proper positioning (top-right)

---

### 7️⃣ Responsive Design Testing

**Browser Resize**:
1. Press F12 (DevTools)
2. Click device toolbar icon
3. Test different sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

**Check**:
- ✅ Navbar collapses properly
- ✅ Course grid adjusts columns
- ✅ Forms remain readable
- ✅ Buttons stack vertically on mobile

---

## 🎯 Feature Checklist

### Core Features
- [x] User Registration
- [x] User Login
- [x] Course Browsing
- [x] Course Enrollment
- [x] User Dashboard
- [x] Career Assessment
- [x] Assessment Results

### Validation Features
- [x] Real-time username check
- [x] Real-time email check
- [x] Password strength indicator
- [x] Form validation
- [x] Toast notifications

### UI Features
- [x] Gradient backgrounds
- [x] Hover animations
- [x] Loading states
- [x] Progress bars
- [x] Responsive design

---

## 🐛 Common Issues & Solutions

### Issue: "Username already taken" immediately
**Solution**: Try different username (e.g., add numbers: krish123, krish456)

### Issue: Password shows "Weak"
**Solution**: Use format like `YourName@123456`

### Issue: Can't enroll in course
**Solution**: Make sure you're logged in first

### Issue: Assessment not loading
**Solution**: Refresh page (Ctrl + R)

---

## 📊 Expected Results Summary

### After Registration:
✅ Success toast
✅ Redirect to dashboard
✅ Username shows in navbar

### After Login:
✅ Welcome toast
✅ Redirect to dashboard
✅ "Logout" button appears

### After Enrollment:
✅ Success toast
✅ Course appears in dashboard
✅ Can't enroll again in same course

### After Assessment:
✅ Shows top 3 strengths
✅ Shows personality profile
✅ Shows 3 career recommendations
✅ Shows comparison table

---

## 🎉 Happy Testing!

**Pro Tips**:
1. Open browser console (F12) to see API mode logs
2. Try different combinations of answers in assessment
3. Test with multiple user accounts
4. Check all hover effects and animations
5. Try enrolling in all 6 courses

**Current Mode**: MOCK (Frontend only - no backend needed)

Enjoy exploring your beautiful course platform! 🚀
