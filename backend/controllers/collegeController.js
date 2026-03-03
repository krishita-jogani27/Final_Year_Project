const { pool: db } = require('../config/db');

// @desc    Get nearby government colleges based on state and degree
// @route   GET /api/colleges
// @access  Protected
exports.getColleges = async (req, res) => {
    try {
        const { state, degree, type } = req.query;

        let query = 'SELECT c.*, d.name AS degree_name FROM colleges c LEFT JOIN degrees d ON c.degree_id = d.id WHERE 1=1';
        const params = [];

        if (state) {
            query += ' AND c.state = ?';
            params.push(state);
        }

        if (degree) {
            // Can search by exact degree name or id. Assuming searching by name for query param
            query += ' AND d.name LIKE ?';
            params.push(`%${degree}%`);
        }

        if (type) {
            query += ' AND c.type = ?';
            params.push(type);
        } else {
            // By default, as per requirements, focus on Government colleges unless specified
            query += ' AND c.type = ?';
            params.push('Government');
        }

        const [colleges] = await db.query(query, params);

        res.status(200).json({
            success: true,
            count: colleges.length,
            data: colleges
        });

    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch colleges',
            error: error.message
        });
    }
};
