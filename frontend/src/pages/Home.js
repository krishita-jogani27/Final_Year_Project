import React, { useState, useEffect } from 'react';
import { courseAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import Hero from '../components/Hero';
import toast from 'react-hot-toast';
import './Home.css';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await courseAPI.getAllCourses();
            if (response.data.success) {
                setCourses(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to load courses');
            console.error('Fetch courses error:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['all', 'Web Development', 'Programming', 'Data Science', 'Backend Development', 'Database', 'Computer Science', 'Marketing', 'Design', 'DevOps', 'Cybersecurity'];

    const filteredCourses = filter === 'all'
        ? courses
        : courses.filter(course => course.category === filter);

    return (
        <div className="home-page">
            <Hero />

            <div className="courses-section">
                <div className="section-header">
                    <h2>Explore Our Courses</h2>
                    <p>Choose from our curated collection of expert-led courses</p>
                </div>

                <div className="filter-tabs">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-tab ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading amazing courses...</p>
                    </div>
                ) : (
                    <div className="courses-grid">
                        {filteredCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}

                {!loading && filteredCourses.length === 0 && (
                    <div className="no-courses">
                        <p>No courses found in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
