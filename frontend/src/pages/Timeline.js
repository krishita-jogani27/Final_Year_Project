import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Timeline.css';

const Timeline = () => {
    const [notifications, setNotifications] = useState([]);
    const [careerRoadmap, setCareerRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchTimelineData = async () => {
             setLoading(true);
            try {
                const token = localStorage.getItem('token');
                
                // Fetch both timeline and notifications parallelly
                const [notifRes, timelineRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/notifications', {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }),
                    axios.get('http://localhost:5000/api/timeline', {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }).catch(err => ({ data: { success: false } })) // graceful fail if no aptitude data
                ]);

                if (notifRes.data.success) {
                    setNotifications(notifRes.data.data);
                }

                if (timelineRes.data && timelineRes.data.success) {
                    setCareerRoadmap(timelineRes.data.data);
                }
                
            } catch (error) {
                console.error('Failed to fetch timeline data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineData();
    }, [isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="timeline-loading">
                <div className="spinner"></div>
                <h2>Loading your distinct career roadmap...</h2>
            </div>
        );
    }

    return (
        <div className="timeline-page-container">
            <div className="timeline-header">
                <h1>Your Personalized Career Roadmap</h1>
                <p>Track admission deadlines alongside a chronological path to your dream career.</p>
            </div>

            <div className="timeline-split-view">
                {/* Left Side: The Chronological Road Map */}
                <div className="roadmap-section">
                    <h2>Career Path Sequence</h2>
                    
                    {!careerRoadmap ? (
                        <div className="empty-state">
                            <p>We need your aptitude results to build a roadmap. <a href="/aptitude-test">Take the test.</a></p>
                        </div>
                    ) : (
                        <div className="roadmap-content">
                            <div className="roadmap-meta">
                                <span className="meta-badge strength">Top Strength: {careerRoadmap.top_strength}</span>
                                <span className="meta-badge degree">Recommended: {careerRoadmap.degree}</span>
                            </div>

                            {careerRoadmap.timelines.map((timelineData, idx) => (
                                <div key={idx} className="career-track">
                                    <h3 className="track-title">Path {idx + 1}: {timelineData.career_title}</h3>
                                    
                                    <div className="timeline-list">
                                        {timelineData.steps.map((step, stepIdx) => (
                                            <div key={step.id} className="timeline-card roadmap-card">
                                                <div className="timeline-number bg-green">{stepIdx + 1}</div>
                                                <div className="timeline-details">
                                                    <h4 className="step-title">{step.step_title}</h4>
                                                    <p className="timeline-message">{step.step_description}</p>
                                                    <span className="timeline-date">Age Group: {step.recommended_age}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Admission Notifications */}
                <div className="notifications-section">
                    <h2>Admission Deadlines & Alerts</h2>
                    
                    {notifications.length === 0 ? (
                        <div className="empty-state">
                            <p>No admission alerts at the moment.</p>
                        </div>
                    ) : (
                        <div className="timeline-list">
                            {notifications.map((notif, idx) => {
                                let badgeClass = 'badge-general';
                                let icon = '!';
                                if (notif.type === 'ADMISSION') { badgeClass = 'badge-admission'; icon = '🏫'; }
                                if (notif.type === 'SCHOLARSHIP') { badgeClass = 'badge-scholarship'; icon = '💰'; }
                                if (notif.type === 'COUNSELING') { badgeClass = 'badge-counseling'; icon = '🗣'; }

                                return (
                                    <div key={notif.id} className="timeline-card notif-card">
                                        <div className={`timeline-number ${badgeClass}`}>{icon}</div>
                                        <div className="timeline-details">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <span className={`notif-type-tag ${badgeClass}`}>{notif.type || 'GENERAL'}</span>
                                                <span className="timeline-date">
                                                    {new Date(notif.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="timeline-message" style={{ marginTop: '5px' }}>{notif.message}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="timeline-footer">
                <button className="btn-primary btn-large block-btn" onClick={() => navigate('/dashboard')}>
                    Finish Flow & Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Timeline;
