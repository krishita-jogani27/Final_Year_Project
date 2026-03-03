const { pool: db } = require('../config/db');

// @desc    Get 10 random quiz questions with options
exports.startQuiz = async (req, res) => {
    try {
        // 1. Fetch 10 random questions
        const [questions] = await db.query(
            `SELECT q.id, q.category_id, q.question_text, q.difficulty, c.name as category_name 
             FROM questions q
             JOIN aptitude_categories c ON q.category_id = c.id
             ORDER BY RAND() LIMIT 10`
        );

        if (questions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No questions found in the database.'
            });
        }

        // 2. Fetch options for these questions (without disclosing is_correct)
        const questionIds = questions.map(q => q.id);
        const [options] = await db.query(
            `SELECT id, question_id, option_text 
             FROM options 
             WHERE question_id IN (?)`,
            [questionIds]
        );

        // 3. Assemble questions with their options
        const quizData = questions.map(q => {
            return {
                ...q,
                options: options.filter(opt => opt.question_id === q.id)
            };
        });

        res.status(200).json({
            success: true,
            count: quizData.length,
            data: quizData
        });

    } catch (error) {
        console.error('Error in startQuiz:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start quiz',
            error: error.message
        });
    }
};

// @desc    Submit Quiz Answers and calculate score
// @access  Protected (Requires auth to save attempt)
exports.submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body;

        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User authentication required to submit quiz.'
            });
        }
        const userId = req.user.id;

        if (!answers || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of answers.'
            });
        }

        let totalScore = 0;
        let categoryScores = {}; // Tracks { category_name: { correct: X, total: Y } }

        // Setup Category tracking defaults based on distinct categories
        const [categories] = await db.query('SELECT name FROM aptitude_categories');
        categories.forEach(cat => {
            categoryScores[cat.name] = { correct: 0, total: 0 };
        });

        const numQuestions = answers.length;

        // Create an attempt record first to get the attempt_id
        const [attemptResult] = await db.query(
            'INSERT INTO user_quiz_attempts (user_id, score, total_questions) VALUES (?, ?, ?)',
            [userId, 0, numQuestions]
        );
        const attemptId = attemptResult.insertId;

        // Process each answer
        for (const answer of answers) {
            let isCorrect = false;

            // Fetch the correct option for this question, along with category details
            const [questionRows] = await db.query(
                `SELECT o.id as correct_option_id, c.name as category_name
                 FROM options o
                 JOIN questions q ON o.question_id = q.id
                 JOIN aptitude_categories c ON q.category_id = c.id
                 WHERE o.question_id = ? AND o.is_correct = TRUE`,
                [answer.question_id]
            );

            if (questionRows.length > 0) {
                const correctOptionId = questionRows[0].correct_option_id;
                const categoryName = questionRows[0].category_name;

                // Track total questions for this category
                if (!categoryScores[categoryName]) {
                    categoryScores[categoryName] = { correct: 0, total: 0 };
                }
                categoryScores[categoryName].total += 1;

                // Validate Answer
                if (answer.selected_option_id === correctOptionId) {
                    isCorrect = true;
                    totalScore += 1;
                    categoryScores[categoryName].correct += 1;
                }
            }

            // Save individual user answer
            await db.query(
                `INSERT INTO user_answers (attempt_id, question_id, selected_option_id, is_correct)
                 VALUES (?, ?, ?, ?)`,
                [attemptId, answer.question_id, answer.selected_option_id, isCorrect]
            );
        }

        // Update the total score in the attempt record
        await db.query(
            'UPDATE user_quiz_attempts SET score = ? WHERE id = ?',
            [totalScore, attemptId]
        );

        // Determine Strength and Weakness
        let strengthCategory = null;
        let weakCategory = null;
        let maxPercentage = -1;
        let minPercentage = 101;

        for (const [catName, stats] of Object.entries(categoryScores)) {
            if (stats.total > 0) {
                const percentage = (stats.correct / stats.total) * 100;

                if (percentage > maxPercentage) {
                    maxPercentage = percentage;
                    strengthCategory = catName;
                }
                if (percentage < minPercentage) {
                    minPercentage = percentage;
                    weakCategory = catName;
                }
            }
        }

        res.status(200).json({
            success: true,
            data: {
                attempt_id: attemptId,
                total_questions: numQuestions,
                score: totalScore,
                percentage: `${((totalScore / numQuestions) * 100).toFixed(2)}%`,
                strength_category: strengthCategory,
                weak_category: weakCategory,
                category_breakdown: categoryScores
            }
        });

    } catch (error) {
        console.error('Error in submitQuiz:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit quiz',
            error: error.message
        });
    }
};
