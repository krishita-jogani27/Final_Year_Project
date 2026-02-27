// Mock Aptitude Assessment Data and Logic

// Quiz Questions Database
export const quizQuestions = {
    // Strengths Assessment
    strengths: [
        {
            id: 1,
            question: "I enjoy solving complex mathematical problems and puzzles",
            category: "analytical",
            options: [
                { text: "Strongly Disagree", score: 1 },
                { text: "Disagree", score: 2 },
                { text: "Neutral", score: 3 },
                { text: "Agree", score: 4 },
                { text: "Strongly Agree", score: 5 }
            ]
        },
        {
            id: 2,
            question: "I am good at understanding how things work mechanically",
            category: "technical",
            options: [
                { text: "Strongly Disagree", score: 1 },
                { text: "Disagree", score: 2 },
                { text: "Neutral", score: 3 },
                { text: "Agree", score: 4 },
                { text: "Strongly Agree", score: 5 }
            ]
        },
        {
            id: 3,
            question: "I enjoy creative activities like design, art, or writing",
            category: "creative",
            options: [
                { text: "Strongly Disagree", score: 1 },
                { text: "Disagree", score: 2 },
                { text: "Neutral", score: 3 },
                { text: "Agree", score: 4 },
                { text: "Strongly Agree", score: 5 }
            ]
        },
        {
            id: 4,
            question: "I am comfortable speaking in front of groups and leading discussions",
            category: "communication",
            options: [
                { text: "Strongly Disagree", score: 1 },
                { text: "Disagree", score: 2 },
                { text: "Neutral", score: 3 },
                { text: "Agree", score: 4 },
                { text: "Strongly Agree", score: 5 }
            ]
        },
        {
            id: 5,
            question: "I like organizing events and managing projects",
            category: "management",
            options: [
                { text: "Strongly Disagree", score: 1 },
                { text: "Disagree", score: 2 },
                { text: "Neutral", score: 3 },
                { text: "Agree", score: 4 },
                { text: "Strongly Agree", score: 5 }
            ]
        }
    ],

    // Interest Assessment
    interests: [
        {
            id: 6,
            question: "Which activity sounds most appealing to you?",
            category: "interest",
            options: [
                { text: "Building websites or apps", score: 5, field: "technology" },
                { text: "Analyzing data and finding patterns", score: 5, field: "data_science" },
                { text: "Creating visual designs", score: 5, field: "design" },
                { text: "Writing content or marketing", score: 5, field: "marketing" },
                { text: "Managing teams and projects", score: 5, field: "management" }
            ]
        },
        {
            id: 7,
            question: "What type of problems do you enjoy solving?",
            category: "interest",
            options: [
                { text: "Technical and logical problems", score: 5, field: "technology" },
                { text: "Business and strategic challenges", score: 5, field: "business" },
                { text: "Creative and design challenges", score: 5, field: "design" },
                { text: "People and communication issues", score: 5, field: "communication" },
                { text: "Research and analytical problems", score: 5, field: "research" }
            ]
        },
        {
            id: 8,
            question: "In your free time, you prefer to:",
            category: "interest",
            options: [
                { text: "Learn new programming languages or tech", score: 5, field: "technology" },
                { text: "Read about business and entrepreneurship", score: 5, field: "business" },
                { text: "Work on creative projects", score: 5, field: "design" },
                { text: "Connect with people and network", score: 5, field: "communication" },
                { text: "Explore science and research topics", score: 5, field: "research" }
            ]
        }
    ],

    // Personality Assessment
    personality: [
        {
            id: 9,
            question: "I prefer working:",
            category: "work_style",
            options: [
                { text: "Alone on focused tasks", score: 5, type: "independent" },
                { text: "In small collaborative teams", score: 5, type: "collaborative" },
                { text: "Leading large groups", score: 5, type: "leadership" },
                { text: "Mix of both", score: 3, type: "flexible" }
            ]
        },
        {
            id: 10,
            question: "When learning something new, I prefer:",
            category: "learning_style",
            options: [
                { text: "Hands-on practice and experimentation", score: 5, type: "practical" },
                { text: "Reading and theoretical understanding", score: 5, type: "theoretical" },
                { text: "Visual demonstrations and videos", score: 5, type: "visual" },
                { text: "Discussion and group learning", score: 5, type: "social" }
            ]
        }
    ]
};

// Career Paths Database
export const careerPaths = {
    technology: {
        name: "Technology & Software Development",
        description: "Build software, websites, and applications",
        courses: ["Web Development", "JavaScript", "React", "Node.js", "Python"],
        careers: ["Software Developer", "Full Stack Developer", "Mobile App Developer", "DevOps Engineer"],
        salary_range: "₹6-25 LPA",
        growth_potential: "Very High",
        skills_required: ["Programming", "Problem Solving", "Logical Thinking"],
        personality_fit: ["independent", "practical", "analytical"]
    },
    data_science: {
        name: "Data Science & Analytics",
        description: "Analyze data and build ML models",
        courses: ["Python", "Machine Learning", "Data Structures", "SQL"],
        careers: ["Data Scientist", "ML Engineer", "Data Analyst", "AI Researcher"],
        salary_range: "₹8-30 LPA",
        growth_potential: "Very High",
        skills_required: ["Mathematics", "Statistics", "Programming"],
        personality_fit: ["analytical", "theoretical", "independent"]
    },
    design: {
        name: "UI/UX Design & Creative",
        description: "Create beautiful user experiences",
        courses: ["UI/UX Design", "Web Development", "Digital Marketing"],
        careers: ["UI/UX Designer", "Product Designer", "Graphic Designer", "Creative Director"],
        salary_range: "₹5-20 LPA",
        growth_potential: "High",
        skills_required: ["Creativity", "Visual Thinking", "User Empathy"],
        personality_fit: ["creative", "visual", "collaborative"]
    },
    marketing: {
        name: "Digital Marketing & Business",
        description: "Promote products and grow businesses",
        courses: ["Digital Marketing", "Web Development", "Business Analytics"],
        careers: ["Digital Marketer", "SEO Specialist", "Content Strategist", "Growth Hacker"],
        salary_range: "₹4-18 LPA",
        growth_potential: "High",
        skills_required: ["Communication", "Creativity", "Analytics"],
        personality_fit: ["communication", "social", "collaborative"]
    },
    management: {
        name: "Project Management & Leadership",
        description: "Lead teams and manage projects",
        courses: ["Project Management", "Business Analytics", "Digital Marketing"],
        careers: ["Project Manager", "Product Manager", "Business Analyst", "Consultant"],
        salary_range: "₹7-25 LPA",
        growth_potential: "Very High",
        skills_required: ["Leadership", "Organization", "Communication"],
        personality_fit: ["leadership", "collaborative", "management"]
    }
};

// Assessment Scoring Logic
export const calculateAssessmentScore = (answers) => {
    const scores = {
        analytical: 0,
        technical: 0,
        creative: 0,
        communication: 0,
        management: 0,
        technology: 0,
        data_science: 0,
        design: 0,
        marketing: 0,
        business: 0,
        research: 0
    };

    const personality = {
        work_style: null,
        learning_style: null
    };

    // Calculate scores from answers
    answers.forEach(answer => {
        const question = [...quizQuestions.strengths, ...quizQuestions.interests, ...quizQuestions.personality]
            .find(q => q.id === answer.questionId);

        if (question) {
            const selectedOption = question.options[answer.selectedOption];

            // Strength scores
            if (question.category === 'analytical' || question.category === 'technical' ||
                question.category === 'creative' || question.category === 'communication' ||
                question.category === 'management') {
                scores[question.category] += selectedOption.score;
            }

            // Interest scores
            if (selectedOption.field) {
                scores[selectedOption.field] = (scores[selectedOption.field] || 0) + selectedOption.score;
            }

            // Personality traits
            if (question.category === 'work_style') {
                personality.work_style = selectedOption.type;
            }
            if (question.category === 'learning_style') {
                personality.learning_style = selectedOption.type;
            }
        }
    });

    return { scores, personality };
};

// Recommendation Engine
export const generateRecommendations = (assessmentResult) => {
    const { scores, personality } = assessmentResult;

    // Find top 3 fields based on scores
    const fieldScores = Object.entries(scores)
        .filter(([key]) => ['technology', 'data_science', 'design', 'marketing', 'business', 'research'].includes(key))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    // Generate recommendations
    const recommendations = fieldScores.map(([field, score]) => {
        const path = careerPaths[field];
        if (!path) return null;

        // Calculate match percentage
        const maxScore = 25; // 5 questions * 5 max score
        const matchPercentage = Math.min(Math.round((score / maxScore) * 100), 100);

        // Check personality fit
        const personalityMatch = path.personality_fit.some(trait =>
            Object.values(personality).includes(trait)
        );

        return {
            field,
            ...path,
            match_percentage: matchPercentage,
            personality_match: personalityMatch,
            score
        };
    }).filter(Boolean);

    return {
        recommendations,
        personality_profile: personality,
        top_strengths: Object.entries(scores)
            .filter(([key]) => ['analytical', 'technical', 'creative', 'communication', 'management'].includes(key))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key, value]) => ({ strength: key, score: value }))
    };
};

// Mock API for Assessment
export const mockAssessmentAPI = {
    getQuizQuestions: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            data: {
                success: true,
                data: quizQuestions
            }
        };
    },

    submitAssessment: async (answers) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const assessmentResult = calculateAssessmentScore(answers);
        const recommendations = generateRecommendations(assessmentResult);

        return {
            data: {
                success: true,
                data: {
                    assessment_id: Date.now(),
                    completed_at: new Date().toISOString(),
                    ...recommendations
                }
            }
        };
    },

    getAssessmentHistory: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            data: {
                success: true,
                data: []
            }
        };
    }
};
