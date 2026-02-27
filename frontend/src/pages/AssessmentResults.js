import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AssessmentResults.css';

const AssessmentResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const results = location.state?.results;

    if (!results) {
        navigate('/assessment');
        return null;
    }

    const { recommendations, personality_profile, top_strengths } = results;

    const getStrengthName = (strength) => {
        const names = {
            analytical: 'Analytical Thinking',
            technical: 'Technical Skills',
            creative: 'Creative Thinking',
            communication: 'Communication',
            management: 'Management & Leadership'
        };
        return names[strength] || strength;
    };

    const getMatchColor = (percentage) => {
        if (percentage >= 80) return '#10b981';
        if (percentage >= 60) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="results-page">
            <div className="results-container">
                {/* Header */}
                <div className="results-header">
                    <div className="success-icon">🎉</div>
                    <h1>Your Assessment Results</h1>
                    <p>Based on your responses, here are your personalized recommendations</p>
                </div>

                {/* Top Strengths */}
                <div className="strengths-section">
                    <h2>Your Top Strengths</h2>
                    <div className="strengths-grid">
                        {top_strengths.map((item, index) => (
                            <div key={index} className="strength-card">
                                <div className="strength-rank">#{index + 1}</div>
                                <h3>{getStrengthName(item.strength)}</h3>
                                <div className="strength-bar">
                                    <div
                                        className="strength-fill"
                                        style={{ width: `${(item.score / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="strength-score">{item.score}/5</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Personality Profile */}
                <div className="personality-section">
                    <h2>Your Personality Profile</h2>
                    <div className="personality-cards">
                        <div className="personality-card">
                            <div className="personality-icon">💼</div>
                            <h3>Work Style</h3>
                            <p className="personality-value">
                                {personality_profile.work_style?.replace('_', ' ').toUpperCase()}
                            </p>
                        </div>
                        <div className="personality-card">
                            <div className="personality-icon">📚</div>
                            <h3>Learning Style</h3>
                            <p className="personality-value">
                                {personality_profile.learning_style?.replace('_', ' ').toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Career Recommendations */}
                <div className="recommendations-section">
                    <h2>Recommended Career Paths</h2>
                    <p className="section-subtitle">
                        Top {recommendations.length} career paths that match your profile
                    </p>

                    <div className="recommendations-grid">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="recommendation-card">
                                <div className="rec-header">
                                    <div className="rec-rank">
                                        <span className="rank-number">#{index + 1}</span>
                                        <span className="match-badge" style={{
                                            background: getMatchColor(rec.match_percentage)
                                        }}>
                                            {rec.match_percentage}% Match
                                        </span>
                                    </div>
                                    {rec.personality_match && (
                                        <span className="personality-badge">
                                            ✓ Personality Fit
                                        </span>
                                    )}
                                </div>

                                <h3>{rec.name}</h3>
                                <p className="rec-description">{rec.description}</p>

                                <div className="rec-details">
                                    <div className="detail-row">
                                        <span className="detail-label">💰 Salary Range:</span>
                                        <span className="detail-value">{rec.salary_range}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">📈 Growth:</span>
                                        <span className="detail-value">{rec.growth_potential}</span>
                                    </div>
                                </div>

                                <div className="rec-section">
                                    <h4>Recommended Courses</h4>
                                    <div className="course-tags">
                                        {rec.courses.slice(0, 4).map((course, i) => (
                                            <span key={i} className="course-tag">{course}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="rec-section">
                                    <h4>Career Options</h4>
                                    <ul className="career-list">
                                        {rec.careers.slice(0, 3).map((career, i) => (
                                            <li key={i}>{career}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rec-section">
                                    <h4>Skills Required</h4>
                                    <div className="skills-tags">
                                        {rec.skills_required.map((skill, i) => (
                                            <span key={i} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className="btn-explore-courses"
                                    onClick={() => navigate('/')}
                                >
                                    Explore Courses
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="comparison-section">
                    <h2>Career Path Comparison</h2>
                    <div className="comparison-table-container">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Career Path</th>
                                    <th>Match %</th>
                                    <th>Salary Range</th>
                                    <th>Growth Potential</th>
                                    <th>Top Skills</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recommendations.map((rec, index) => (
                                    <tr key={index}>
                                        <td className="path-name">{rec.name}</td>
                                        <td>
                                            <span
                                                className="match-percentage"
                                                style={{ color: getMatchColor(rec.match_percentage) }}
                                            >
                                                {rec.match_percentage}%
                                            </span>
                                        </td>
                                        <td>{rec.salary_range}</td>
                                        <td>{rec.growth_potential}</td>
                                        <td className="skills-cell">
                                            {rec.skills_required.slice(0, 2).join(', ')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Actions */}
                <div className="results-actions">
                    <button
                        className="btn-retake"
                        onClick={() => navigate('/assessment')}
                    >
                        Retake Assessment
                    </button>
                    <button
                        className="btn-browse"
                        onClick={() => navigate('/')}
                    >
                        Browse All Courses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentResults;
