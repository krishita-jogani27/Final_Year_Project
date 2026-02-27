import React from 'react';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../services/api';
import toast from 'react-hot-toast';
import './CourseCard.css';

const CourseCard = ({ course, enrolled = false }) => {
    const { isAuthenticated } = useAuth();

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to enroll in courses');
            return;
        }

        try {
            const response = await courseAPI.enrollInCourse(course.id);
            if (response.data.success) {
                toast.success('🎉 Successfully enrolled in course!');
            }
        } catch (error) {
            if (error.response?.data?.message === 'Already enrolled in this course') {
                toast.error('You are already enrolled in this course');
            } else {
                toast.error('Failed to enroll. Please try again.');
            }
        }
    };

    const openCourse = () => {
        window.open(course.youtube_url, '_blank');
    };

    return (
        <div className="course-card">
            <div className="course-thumbnail">
                <img src={course.thumbnail_url} alt={course.title} />
                <div className="course-overlay">
                    <button className="btn-play" onClick={openCourse}>
                        ▶ Watch Now
                    </button>
                </div>
                <div className="course-badge">{course.level}</div>
            </div>

            <div className="course-content">
                <div className="course-category">{course.category}</div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-instructor">
                    <span className="instructor-icon">👨‍🏫</span>
                    <span>{course.instructor}</span>
                </div>

                <div className="course-meta">
                    <div className="meta-item">
                        <span className="meta-icon">⏱️</span>
                        <span>{course.duration}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-icon">⭐</span>
                        <span>{course.rating}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-icon">👥</span>
                        <span>{course.students_enrolled.toLocaleString()}</span>
                    </div>
                </div>

                {!enrolled && (
                    <button className="btn-enroll" onClick={handleEnroll}>
                        Enroll Now
                    </button>
                )}

                {enrolled && (
                    <div className="enrolled-badge">
                        ✓ Enrolled
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
