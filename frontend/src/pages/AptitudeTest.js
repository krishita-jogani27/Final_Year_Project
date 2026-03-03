import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './AptitudeTest.css';

const AptitudeTest = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [testStarted, setTestStarted] = useState(false);

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (testStarted && isAuthenticated) {
            fetchQuestions();
        }
    }, [testStarted, isAuthenticated]);

    // Timer effect
    useEffect(() => {
        if (!testStarted || loading || result || submitting) return;

        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    handleSubmitQuiz(); // Automatically submit when time is up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [loading, result, submitting]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/quiz/start', { withCredentials: true });
            if (response.data.success) {
                setQuestions(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            toast.error('Failed to load quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (questionId, optionId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to save your results.');
            return;
        }

        setSubmitting(true);
        const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
            question_id: parseInt(questionId),
            selected_option_id: parseInt(optionId)
        }));

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/quiz/submit',
                { answers: formattedAnswers },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                toast.success('Quiz submitted successfully!');
                navigate('/aptitude-results', { state: { result: response.data.data } });
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to submit quiz.');
        } finally {
            setSubmitting(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isAuthenticated) {
        return (
            <div className="test-empty" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '15px' }}>Authentication Required</h2>
                <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '30px', maxWidth: '500px' }}>
                    You must be logged in to access the Aptitude Test. We need an account to save your results and track analytics.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button className="btn-primary" onClick={() => navigate('/login')}>Login to Account</button>
                    <button className="btn-secondary" onClick={() => navigate('/register')}>Create New Account</button>
                </div>
            </div>
        );
    }

    if (!testStarted) {
        return (
            <div className="aptitude-test-container" style={{ textAlign: 'center', padding: '50px 30px' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '10px' }}>Career Aptitude Test</h2>
                    <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                        Discover your strengths, analyze your weaknesses, and get AI-powered career recommendations mapped to your abilities.
                    </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', maxWidth: '500px', margin: '0 auto 40px', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ color: '#0f172a', fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        📋 Important Test Instructions
                    </h4>
                    <ul style={{ color: '#334155', paddingLeft: '25px', lineHeight: '1.8' }}>
                        <li>The test contains exactly <b>10 random questions</b>.</li>
                        <li>You have a strict time limit of <b>10 minutes</b>.</li>
                        <li>The test includes Logical, Quantitative, Verbal, and Technical sections.</li>
                        <li>Please <b>do not refresh or close</b> the page once started.</li>
                    </ul>
                </div>

                <button
                    className="btn-primary"
                    style={{ fontSize: '1.2rem', padding: '16px 48px', borderRadius: '30px', boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)' }}
                    onClick={() => setTestStarted(true)}
                >
                    Start Test Now
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="test-loading">
                <div className="spinner"></div>
                <p>Loading your personalized aptitude test...</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div className="test-empty">No questions available at the moment.</div>;
    }

    const currentQuestion = questions[currentIndex];
    const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="aptitude-test-container">
            <div className="test-header">
                <div className="header-info">
                    <h2>Aptitude Test</h2>
                    <span className="category-badge">{currentQuestion.category_name}</span>
                </div>
                <div className={`timer ${timeLeft < 60 ? 'timer-warning' : ''}`}>
                    ⏱ {formatTime(timeLeft)}
                </div>
            </div>

            <div className="progress-container">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <span className="progress-text">Question {currentIndex + 1} of {questions.length}</span>
            </div>

            <div className="question-card">
                <h3 className="question-text">{currentQuestion.question_text}</h3>

                <div className="options-grid">
                    {currentQuestion.options.map(option => (
                        <div
                            key={option.id}
                            className={`option-item ${answers[currentQuestion.id] === option.id ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                        >
                            <span className="option-text">{option.option_text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="test-navigation">
                <button
                    className="btn-secondary"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>

                {currentIndex === questions.length - 1 ? (
                    <button
                        className="btn-submit"
                        onClick={handleSubmitQuiz}
                        disabled={submitting || Object.keys(answers).length < questions.length}
                    >
                        {submitting ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                ) : (
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default AptitudeTest;
