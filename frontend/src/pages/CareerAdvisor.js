import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CareerAdvisor.css'; // We'll create this next

const CareerAdvisor = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/recommendations', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });

                if (response.data.success) {
                    setRecommendations(response.data.data);
                } else {
                    setError('Failed to fetch recommendations.');
                }
            } catch (err) {
                console.error('Error fetching recommendations:', err);
                if (err.response && err.response.status === 404) {
                    setError('No aptitude test results found. Please take the test first to unlock your personalized career roadmap!');
                } else {
                    setError('An error occurred while generating your recommendations. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="career-loading-container">
                <div className="spinner"></div>
                <h2 style={{ marginTop: '20px', color: '#1e293b' }}>Analyzing your aptitude profile...</h2>
                <p>Curating your personalized degree and career roadmap.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="career-error-container">
                <h2>Oops!</h2>
                <p>{error}</p>
                <div style={{ marginTop: '30px' }}>
                    <button className="btn-primary" onClick={() => navigate('/aptitude-test')}>Take Aptitude Test</button>
                    <button className="btn-secondary" onClick={() => navigate('/dashboard')} style={{ marginLeft: '15px' }}>Go to Dashboard</button>
                </div>
            </div>
        );
    }

    // Exam mapping logic: Quick map of degrees to common entrance exams (this could be shifted to DB later)
    const getRequiredExams = (stream) => {
        switch (stream?.toLowerCase()) {
            case 'engineering': return 'JEE Main, JEE Advanced, BITSAT, State CETs';
            case 'management': return 'IPMAT, NPAT, CUET, SET';
            case 'science': return 'CUET, NEST, IIT JAM (for PG), University Specific Exams';
            case 'arts': return 'CUET, University Specific Entrances';
            default: return 'Check specific university requirements.';
        }
    };

    return (
        <div className="career-advisor-container">
            <div className="advisor-header">
                <div className="profile-badge">
                    <span className="badge-icon">🎯</span>
                    <div>
                        <span className="badge-label">Top Aptitude Strength</span>
                        <h3 className="badge-value">{recommendations?.top_strength}</h3>
                    </div>
                </div>
                <h1>Your Personalized Career Roadmap</h1>
                <p>Based on your unique cognitive strengths mapped from our database, here are your top 3 recommended academic paths and future careers.</p>
            </div>

            <div className="degrees-grid">
                {recommendations?.recommended_degrees.map((degree, index) => (
                    <div className="degree-card" key={index}>
                        <div className="degree-rank">#{index + 1} Match</div>

                        <div className="degree-header">
                            <span className="degree-stream">{degree.stream}</span>
                            <h2>{degree.name}</h2>
                            <p className="degree-description">{degree.description}</p>
                        </div>

                        <div className="degree-reasoning">
                            <strong>Why it's a fit:</strong> {degree.reasoning}
                        </div>

                        <div className="degree-exams">
                            <h4>📝 Recommended Entrance Exams:</h4>
                            <p>{getRequiredExams(degree.stream)}</p>
                        </div>

                        <div className="careers-section">
                            <h4>🚀 Gateway to these Careers:</h4>
                            <div className="careers-list">
                                {degree.related_careers.map((career, cIndex) => (
                                    <div className="career-item" key={cIndex}>
                                        <div className="career-title-row">
                                            <h5>{career.title}</h5>
                                            <span className="career-salary">💰 {career.average_salary}</span>
                                        </div>
                                        <p>{career.description}</p>
                                    </div>
                                ))}
                                {degree.related_careers.length === 0 && (
                                    <p className="no-careers">Specific career mappings coming soon.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="advisor-footer">
                <button className="btn-primary" onClick={() => navigate('/colleges')}>
                    Next: Show Colleges & Courses
                </button>
            </div>
        </div>
    );
};

export default CareerAdvisor;
