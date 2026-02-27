const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching courses',
            error: error.message
        });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching course',
            error: error.message
        });
    }
};

// @desc    Get courses by category
// @route   GET /api/courses/category/:category
// @access  Public
const getCoursesByCategory = async (req, res) => {
    try {
        const courses = await Course.findByCategory(req.params.category);

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Get courses by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Search courses
// @route   GET /api/courses/search/:query
// @access  Public
const searchCourses = async (req, res) => {
    try {
        const courses = await Course.search(req.params.query);

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Search courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Enroll in course
// @route   POST /api/courses/enroll
// @access  Private
const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if already enrolled
        const alreadyEnrolled = await Enrollment.isEnrolled(userId, courseId);
        if (alreadyEnrolled) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this course'
            });
        }

        // Create enrollment
        await Enrollment.create(userId, courseId);

        // Increment students enrolled count
        await Course.incrementStudentsEnrolled(courseId);

        res.status(201).json({
            success: true,
            message: 'Successfully enrolled in course'
        });
    } catch (error) {
        console.error('Enroll error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during enrollment',
            error: error.message
        });
    }
};

// @desc    Get user's enrolled courses
// @route   GET /api/courses/my-courses
// @access  Private
const getMyEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const enrolledCourses = await Enrollment.getUserEnrollments(userId);

        res.status(200).json({
            success: true,
            count: enrolledCourses.length,
            data: enrolledCourses
        });
    } catch (error) {
        console.error('Get enrolled courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    getCoursesByCategory,
    searchCourses,
    enrollInCourse,
    getMyEnrolledCourses
};
