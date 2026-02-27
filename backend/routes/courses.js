const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourseById,
    getCoursesByCategory,
    searchCourses,
    enrollInCourse,
    getMyEnrolledCourses
} = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllCourses);
router.get('/search/:query', searchCourses);
router.get('/category/:category', getCoursesByCategory);
router.get('/:id', getCourseById);

// Protected routes
router.post('/enroll', protect, enrollInCourse);
router.get('/my/enrolled', protect, getMyEnrolledCourses);

module.exports = router;
