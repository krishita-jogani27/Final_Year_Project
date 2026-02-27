const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { checkPasswordStrength } = require('../middleware/validation');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { username, email, password, full_name } = req.body;``

        // Check if user already exists
        const userExistsByEmail = await User.findByEmail(email);
        if (userExistsByEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const userExistsByUsername = await User.findByUsername(username);
        if (userExistsByUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username already taken'
            });
        }

        // Check password strength
        const passwordStrength = checkPasswordStrength(password);
        if (passwordStrength.score < 4) {
            return res.status(400).json({
                success: false,
                message: 'Password is too weak',
                feedback: passwordStrength.feedback
            });
        }

        // Create user
        const userId = await User.create({ username, email, password, full_name });

        // Generate token
        const token = generateToken(userId);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                userId,
                username,
                email,
                full_name,
                token
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isPasswordValid = await User.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                userId: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message
        });
    }
};

// @desc    Check if username exists
// @route   POST /api/auth/check-username
// @access  Public
const checkUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const exists = await User.usernameExists(username);

        res.status(200).json({
            success: true,
            exists,
            message: exists ? 'Username already taken' : 'Username available'
        });
    } catch (error) {
        console.error('Check username error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Check if email exists
// @route   POST /api/auth/check-email
// @access  Public
const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const exists = await User.emailExists(email);

        res.status(200).json({
            success: true,
            exists,
            message: exists ? 'Email already registered' : 'Email available'
        });
    } catch (error) {
        console.error('Check email error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    checkUsername,
    checkEmail,
    getMe
};
