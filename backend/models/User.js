const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    // Create new user
    static async create(userData) {
        const { username, email, password, full_name } = userData;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [username, email, hashedPassword, full_name]);

        return result.insertId;
    }

    // Find user by email
    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    }

    // Find user by username
    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await pool.execute(query, [username]);
        return rows[0];
    }

    // Find user by ID
    static async findById(id) {
        const query = 'SELECT id, username, email, full_name, created_at FROM users WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    // Compare password
    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Check if username exists
    static async usernameExists(username) {
        const query = 'SELECT COUNT(*) as count FROM users WHERE username = ?';
        const [rows] = await pool.execute(query, [username]);
        return rows[0].count > 0;
    }

    // Check if email exists
    static async emailExists(email) {
        const query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        return rows[0].count > 0;
    }
}

module.exports = User;
