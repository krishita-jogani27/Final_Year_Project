const { pool: db } = require('../config/db');

// @desc    Get chronological career timelines based on user's recommended careers
// @access  Protected
exports.getCareerTimeline = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Find the user's latest quiz attempt
        const [attempts] = await db.query(
            'SELECT id FROM user_quiz_attempts WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
            [userId]
        );

        if (attempts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No quiz attempts found. Cannot generate a timeline without aptitude data.'
            });
        }
        const attemptId = attempts[0].id;

        // 2. Identify their Top Category
        const [categoryResults] = await db.query(
            `SELECT c.id AS category_id, c.name AS category_name, 
                    SUM(CASE WHEN ua.is_correct = TRUE THEN 1 ELSE 0 END) as correct_count,
                    COUNT(ua.id) as total_count
             FROM user_answers ua
             JOIN questions q ON ua.question_id = q.id
             JOIN aptitude_categories c ON q.category_id = c.id
             WHERE ua.attempt_id = ?
             GROUP BY c.id, c.name
             ORDER BY (correct_count / total_count) DESC, correct_count DESC
             LIMIT 1`,
            [attemptId]
        );

        if (categoryResults.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Could not calculate category scores for timeline generation.'
            });
        }

        const topCategory = categoryResults[0];

        // 3. Find the Top Degree mapped to this Category
        const [degrees] = await db.query(
            `SELECT d.id, d.name, cdm.weight_score
             FROM degrees d
             JOIN category_degree_map cdm ON d.id = cdm.degree_id
             WHERE cdm.aptitude_category_id = ?
             ORDER BY cdm.weight_score DESC
             LIMIT 1`,
            [topCategory.category_id]
        );

        if (degrees.length === 0) {
             return res.status(404).json({
                success: false,
                message: 'No degrees mapped to this aptitude profile.'
            });
        }
        const topDegree = degrees[0];

        // 4. Find Top Career Roles mapped to this Degree
        const [careers] = await db.query(
            `SELECT cr.id, cr.title
             FROM career_roles cr
             JOIN degree_career_map dcm ON cr.id = dcm.career_role_id
             WHERE dcm.degree_id = ?
             LIMIT 2`, // Max 2 primary careers for clarity
            [topDegree.id]
        );

        if (careers.length === 0) {
            return res.status(404).json({
               success: false,
               message: 'No careers mapped to the recommended degree.'
           });
       }

       // 5. Fetch the timeline steps for these careers
       const careerTimelines = [];

       for (let career of careers) {
           const [steps] = await db.query(
               `SELECT id, step_title, step_description, recommended_age
                FROM career_timelines
                WHERE career_role_id = ?
                ORDER BY id ASC`, // Chronological order
               [career.id]
           );

           careerTimelines.push({
               career_id: career.id,
               career_title: career.title,
               steps: steps
           });
       }

        res.status(200).json({
            success: true,
            data: {
                top_strength: topCategory.category_name,
                degree: topDegree.name,
                timelines: careerTimelines
            }
        });

    } catch (error) {
        console.error('Error fetching career timeline:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch career timeline',
            error: error.message
        });
    }
};
