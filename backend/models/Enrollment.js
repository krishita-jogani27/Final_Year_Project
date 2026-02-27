const { pool } = require('../config/db');

class Enrollment {
    // Create enrollment
    static async create(userId, courseId) {
        const query = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';
        const [result] = await pool.execute(query, [userId, courseId]);
        return result.insertId;
    }

    // Check if user is enrolled in course
    static async isEnrolled(userId, courseId) {
        const query = 'SELECT COUNT(*) as count FROM enrollments WHERE user_id = ? AND course_id = ?';
        const [rows] = await pool.execute(query, [userId, courseId]);
        return rows[0].count > 0;
    }

    // Get user's enrolled courses
    static async getUserEnrollments(userId) {
        const query = `
            SELECT c.*, e.enrolled_at, e.progress, e.completed
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            WHERE e.user_id = ?
            ORDER BY e.enrolled_at DESC
        `;
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    }

    // Update progress
    static async updateProgress(userId, courseId, progress) {
        const query = 'UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?';
        await pool.execute(query, [progress, userId, courseId]);
    }

    // Mark as completed
    static async markCompleted(userId, courseId) {
        const query = 'UPDATE enrollments SET completed = TRUE, progress = 100 WHERE user_id = ? AND course_id = ?';
        await pool.execute(query, [userId, courseId]);
    }

    // Get enrollment count for a course
    static async getCourseEnrollmentCount(courseId) {
        const query = 'SELECT COUNT(*) as count FROM enrollments WHERE course_id = ?';
        const [rows] = await pool.execute(query, [courseId]);
        return rows[0].count;
    }
}

module.exports = Enrollment;
