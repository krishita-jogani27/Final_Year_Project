const express = require('express');
const router = express.Router();
const {
    register,
    login,
    checkUsername,
    checkEmail,
    getMe
} = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
