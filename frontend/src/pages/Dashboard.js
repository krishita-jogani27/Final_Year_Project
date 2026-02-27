import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchEnrolledCourses();
    }, [isAuthenticated, navigate]);

    const fetchEnrolledCourses = async () => {
        try {
            const response = await courseAPI.getMyEnrolledCourses();
            if (response.data.success) {
                setEnrolledCourses(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to load your courses');
            console.error('Fetch enrolled courses error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>Welcome back, {user?.username}! 👋</h1>
                    <p>Continue your learning journey</p>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📚</div>
                        <div className="stat-info">
                            <div className="stat-value">{enrolledCourses.length}</div>
                            <div className="stat-label">Enrolled Courses</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-info">
                            <div className="stat-value">
                                {enrolledCourses.filter(c => c.completed).length}
                            </div>
                            <div className="stat-label">Completed</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-info">
                            <div className="stat-value">
                                {enrolledCourses.filter(c => !c.completed).length}
                            </div>
                            <div className="stat-label">In Progress</div>
                        </div>
                    </div>
                </div>

                <div className="section-title">
                    <h2>My Courses</h2>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading your courses...</p>
                    </div>
                ) : enrolledCourses.length > 0 ? (
                    <div className="courses-grid">
                        {enrolledCourses.map(course => (
                            <CourseCard key={course.id} course={course} enrolled={true} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📚</div>
                        <h3>No courses yet</h3>
                        <p>Start learning by enrolling in a course</p>
                        <button
                            className="btn-explore"
                            onClick={() => navigate('/')}
                        >
                            Explore Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
