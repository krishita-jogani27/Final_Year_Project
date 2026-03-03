const { pool: db } = require('../config/db');

// @desc    Get details about a specific career including exams and degree paths
// @access  Protected
exports.getCareerDetails = async (req, res) => {
    try {
        const careerId = req.params.id;

        // 1. Fetch Career Details
        const [careers] = await db.query('SELECT * FROM career_roles WHERE id = ?', [careerId]);
        if (careers.length === 0) {
            return res.status(404).json({ success: false, message: 'Career role not found.' });
        }
        const career = careers[0];

        // 2. Fetch Required Exams
        const [exams] = await db.query(
            `SELECT e.id, e.name, e.description, e.eligibility, e.exam_date 
             FROM exams e 
             JOIN career_exam_map cem ON e.id = cem.exam_id 
             WHERE cem.career_role_id = ?`,
            [careerId]
        );

        // 3. Fetch Degree Paths
        const [degrees] = await db.query(
            `SELECT d.id, d.name, d.stream, d.description 
             FROM degrees d 
             JOIN degree_career_map dcm ON d.id = dcm.degree_id 
             WHERE dcm.career_role_id = ?`,
            [careerId]
        );

        // 4. Generate a standard preparation timeline
        const preparation_timeline = [
            { step: 1, title: 'Complete 10+2 Education', description: 'Focus on relevant stream subjects with >60% aggregate.' },
            { step: 2, title: 'Entrance Exams Preparation', description: exams.length > 0 ? `Prepare for ${exams.map(e => e.name).join(', ')}.` : 'Research university-specific entrance requirements.' },
            { step: 3, title: 'Complete Undergrad Degree', description: degrees.length > 0 ? `Pursue ${degrees.map(d => d.name).join(' or ')}.` : 'Enroll in a relevant bachelor program.' },
            { step: 4, title: 'Internships & Skill Building', description: `Gain practical experience and build a portfolio related to ${career.title}.` },
            { step: 5, title: 'Job Placement', description: 'Apply for entry-level roles or pursue higher education/certifications.' }
        ];

        res.status(200).json({
            success: true,
            data: {
                career: career,
                required_exams: exams,
                degree_paths: degrees,
                preparation_timeline: preparation_timeline
            }
        });

    } catch (error) {
        console.error('Error fetching career details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch career details',
            error: error.message
        });
    }
};
