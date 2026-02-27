const { pool } = require('../config/db');

class Course {
    // Get all courses
    static async findAll() {
        const query = 'SELECT * FROM courses ORDER BY rating DESC, students_enrolled DESC';
        const [rows] = await pool.execute(query);
        return rows;
    }

    // Get course by ID
    static async findById(id) {
        const query = 'SELECT * FROM courses WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    // Get courses by category
    static async findByCategory(category) {
        const query = 'SELECT * FROM courses WHERE category = ? ORDER BY rating DESC';
        const [rows] = await pool.execute(query, [category]);
        return rows;
    }

    // Get courses by level
    static async findByLevel(level) {
        const query = 'SELECT * FROM courses WHERE level = ? ORDER BY rating DESC';
        const [rows] = await pool.execute(query, [level]);
        return rows;
    }

    // Search courses
    static async search(searchTerm) {
        const query = `
            SELECT * FROM courses 
            WHERE title LIKE ? OR description LIKE ? OR instructor LIKE ?
            ORDER BY rating DESC
        `;
        const searchPattern = `%${searchTerm}%`;
        const [rows] = await pool.execute(query, [searchPattern, searchPattern, searchPattern]);
        return rows;
    }

    // Increment students enrolled count
    static async incrementStudentsEnrolled(courseId) {
        const query = 'UPDATE courses SET students_enrolled = students_enrolled + 1 WHERE id = ?';
        await pool.execute(query, [courseId]);
    }
}

module.exports = Course;
