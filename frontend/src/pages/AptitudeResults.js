import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import './AptitudeTest.css';
import './AptitudeRecommendations.css';

const AptitudeResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if result data was passed via router state
    const result = location.state?.result;

    const [recommendations, setRecommendations] = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);

    if (!result) {
        // If someone navigates to /aptitude-results directly without taking a test
        return <Navigate to="/aptitude-test" replace />;
    }

    const handleGetRecommendations = async () => {
        setLoadingAI(true);
        try {
            const response = await axios.post('http://localhost:5000/api/recommendations/generate', {
                score: result.score,
                total_questions: result.total_questions,
                strength_category: result.strength_category,
                weak_category: result.weak_category,
                category_breakdown: result.category_breakdown
            }, { withCredentials: true });

            if (response.data.success) {
                setRecommendations(response.data.data.recommendation_text);
                toast.success('Recommendations generated successfully!');
            }
        } catch (error) {
            console.error('Error generating recommendations:', error);
            // Specifically handling the placeholder key error
            if (error.response?.data?.message?.includes('API Key is not configured')) {
                toast.error('The backend requires a configured AI API Key. Please add it to the .env file.');
            } else {
                toast.error('Failed to generate career recommendations.');
            }
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div className="test-results-container">
            <h2>Quiz Results</h2>
            <div className="result-card">
                <div className="score-circle">
                    <span>{result.score}/{result.total_questions}</span>
                    <p>{result.percentage}</p>
                </div>

                <div className="category-insights">
                    <div className="insight strength">
                        <h3>🌟 Top Strength</h3>
                        <p>{result.strength_category || 'N/A'}</p>
                    </div>
                    <div className="insight weakness">
                        <h3>🎯 Area to Improve</h3>
                        <p>{result.weak_category || 'N/A'}</p>
                    </div>
                </div>

                <div className="breakdown">
                    <h3>Detailed Breakdown</h3>
                    {Object.entries(result.category_breakdown).map(([cat, stats]) => (
                        <div key={cat} className="breakdown-item">
                            <span>{cat}</span>
                            <div className="progress-bg">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                                ></div>
                            </div>
                            <span>{stats.correct}/{stats.total}</span>
                        </div>
                    ))}
                </div>

                {/* AI Recommendations Section */}
                {loadingAI && (
                    <div className="ai-loading">
                        <div className="spinner"></div>
                        <p>Our AI is analyzing your profile and generating personalized career paths...</p>
                    </div>
                )}

                {recommendations && (
                    <div className="recommendations-container">
                        <h3>💡 AI Career Recommendations</h3>
                        <div className="markdown-content">
                            <ReactMarkdown>{recommendations}</ReactMarkdown>
                        </div>
                    </div>
                )}

                {!recommendations && !loadingAI && (
                    <div className="result-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
                        <button className="btn-primary" onClick={() => navigate('/career-advisor')}>
                            Next: Generate Career Suggestions
                        </button>
                        <button className="btn-secondary" onClick={handleGetRecommendations} style={{ fontSize: '0.9rem' }}>
                            Ask AI Instead
                        </button>
                    </div>
                )}

                {recommendations && !loadingAI && (
                    <div className="result-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
                        <button className="btn-primary" onClick={() => navigate('/career-advisor')}>
                            Next: View Career Roadmap
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AptitudeResults;
