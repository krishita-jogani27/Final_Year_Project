import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockAssessmentAPI } from '../services/assessmentData';
import toast from 'react-hot-toast';
import './Assessment.css';

const Assessment = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [quizData, setQuizData] = useState(null);
    const [currentSection, setCurrentSection] = useState('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            toast.error('Please login first to take the assessment', {
                id: 'auth-assessment-error', // Prevents duplicates
            });
            navigate('/login');
            return;
        }
        loadQuiz();
    }, [isAuthenticated, navigate]);

    const loadQuiz = async () => {
        try {
            const response = await mockAssessmentAPI.getQuizQuestions();
            setQuizData(response.data.data);

            // Flatten all questions
            const questions = [
                ...response.data.data.strengths,
                ...response.data.data.interests,
                ...response.data.data.personality
            ];
            setAllQuestions(questions);
        } catch (error) {
            toast.error('Failed to load assessment');
        }
    };

    const handleStartAssessment = () => {
        setCurrentSection('quiz');
    };

    const handleAnswer = (optionIndex) => {
        const currentQuestion = allQuestions[currentQuestionIndex];

        setAnswers([...answers, {
            questionId: currentQuestion.id,
            selectedOption: optionIndex
        }]);

        // Move to next question or finish
        if (currentQuestionIndex < allQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            submitAssessment([...answers, {
                questionId: currentQuestion.id,
                selectedOption: optionIndex
            }]);
        }
    };

    const submitAssessment = async (finalAnswers) => {
        setLoading(true);
        try {
            const response = await mockAssessmentAPI.submitAssessment(finalAnswers);

            if (response.data.success) {
                toast.success('Assessment completed! 🎉');
                // Navigate to results page with data
                navigate('/assessment-results', {
                    state: { results: response.data.data }
                });
            }
        } catch (error) {
            toast.error('Failed to submit assessment');
        } finally {
            setLoading(false);
        }
    };

    const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

    if (!quizData) {
        return (
            <div className="assessment-loading">
                <div className="loading-spinner"></div>
                <p>Loading assessment...</p>
            </div>
        );
    }

    if (currentSection === 'intro') {
        return (
            <div className="assessment-page">
                <div className="assessment-intro">
                    <div className="intro-icon">🎯</div>
                    <h1>Career Aptitude Assessment</h1>
                    <p className="intro-subtitle">
                        Discover your strengths, interests, and ideal career path
                    </p>

                    <div className="intro-features">
                        <div className="feature-card">
                            <div className="feature-icon">💪</div>
                            <h3>Assess Your Strengths</h3>
                            <p>Identify your natural abilities and skills</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">❤️</div>
                            <h3>Explore Interests</h3>
                            <p>Find what truly motivates and excites you</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎓</div>
                            <h3>Get Recommendations</h3>
                            <p>Receive personalized course and career suggestions</p>
                        </div>
                    </div>

                    <div className="intro-details">
                        <div className="detail-item">
                            <span className="detail-icon">⏱️</span>
                            <span>5-10 minutes</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">❓</span>
                            <span>{allQuestions.length} questions</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">📊</span>
                            <span>Instant results</span>
                        </div>
                    </div>

                    <button className="btn-start-assessment" onClick={handleStartAssessment}>
                        Start Assessment
                        <span className="btn-arrow">→</span>
                    </button>

                    <p className="intro-note">
                        💡 Answer honestly for the most accurate recommendations
                    </p>
                </div>
            </div>
        );
    }

    if (currentSection === 'quiz' && allQuestions.length > 0) {
        const currentQuestion = allQuestions[currentQuestionIndex];

        return (
            <div className="assessment-page">
                <div className="quiz-container">
                    <div className="quiz-header">
                        <div className="progress-info">
                            <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="question-card">
                        <div className="question-number">Q{currentQuestionIndex + 1}</div>
                        <h2 className="question-text">{currentQuestion.question}</h2>

                        <div className="options-container">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    className="option-button"
                                    onClick={() => handleAnswer(index)}
                                    disabled={loading}
                                >
                                    <span className="option-letter">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="option-text">{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading && (
                        <div className="submitting-overlay">
                            <div className="loading-spinner"></div>
                            <p>Analyzing your responses...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default Assessment;
