// Using native fetch instead of the Beta @openrouter/sdk to avoid validation bugs
const { pool: db } = require('../config/db');

// @desc    Generate career recommendations based on quiz results
// @access  Protected
exports.generateRecommendations = async (req, res) => {
    try {
        const { score, total_questions, strength_category, weak_category, category_breakdown } = req.body;

        if (!strength_category) {
            return res.status(400).json({
                success: false,
                message: 'Missing required quiz result data (strength_category).'
            });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
            return res.status(500).json({
                success: false,
                message: 'OpenRouter API Key is not configured in the backend .env file.'
            });
        }

        // Construct the Prompt
        let breakdownStr = '';
        if (category_breakdown) {
            breakdownStr = Object.entries(category_breakdown)
                .map(([cat, stats]) => `${cat}: ${stats.correct}/${stats.total}`)
                .join(', ');
        }

        const prompt = `
            You are an expert career counselor. A student has just completed an aptitude test.
            Here are their results:
            - Overall Score: ${score} out of ${total_questions}
            - Top Strength: ${strength_category}
            - Area to Improve: ${weak_category || 'None identified'}
            - Detailed Breakdown: ${breakdownStr || 'Not provided'}

            Based on these specific results, recommend 3 suitable career paths.
            For each career path, provide:
            1. The Job Title
            2. A brief 2-sentence explanation of why it fits their strengths (especially ${strength_category}).
            3. One specific skill they should focus on developing based on their weakness (${weak_category}).

            Format your response in clean Markdown. Use headings for each career path. Keep it encouraging and professional.
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.5-flash",
                "messages": [
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${data.error?.message || response.statusText}`);
        }

        const text = data.choices[0].message.content;

        res.status(200).json({
            success: true,
            data: {
                recommendation_text: text
            }
        });

    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate recommendations',
            error: error.message
        });
    }
};

// @desc    Get degree/career recommendations based on DB mapping
// @access  Protected
exports.getDegreeRecommendations = async (req, res) => {
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
                message: 'No quiz attempts found for this user. Please complete the aptitude test first.'
            });
        }
        const attemptId = attempts[0].id;

        // 2. Calculate the highest scoring category for this attempt
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
                message: 'Could not calculate category scores for this attempt.'
            });
        }

        const topCategory = categoryResults[0];

        // 3. Find top 3 degrees for this category
        const [degrees] = await db.query(
            `SELECT d.id, d.name, d.stream, d.description, cdm.weight_score
             FROM degrees d
             JOIN category_degree_map cdm ON d.id = cdm.degree_id
             WHERE cdm.aptitude_category_id = ?
             ORDER BY cdm.weight_score DESC
             LIMIT 3`,
            [topCategory.category_id]
        );

        // 4. Find career roles for each degree
        const recommendations = [];
        for (let degree of degrees) {
            const [careers] = await db.query(
                `SELECT cr.id, cr.title, cr.description, cr.average_salary
                 FROM career_roles cr
                 JOIN degree_career_map dcm ON cr.id = dcm.career_role_id
                 WHERE dcm.degree_id = ?`,
                [degree.id]
            );

            recommendations.push({
                ...degree,
                related_careers: careers,
                reasoning: `Because your top strength is ${topCategory.category_name} (scored ${topCategory.correct_count}/${topCategory.total_count}), this degree matches your aptitude profile.`
            });
        }

        res.status(200).json({
            success: true,
            data: {
                top_strength: topCategory.category_name,
                recommended_degrees: recommendations
            }
        });

    } catch (error) {
        console.error('Error fetching degree recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch degree recommendations',
            error: error.message
        });
    }
};
