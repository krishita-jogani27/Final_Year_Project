import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="hero-content">
                <h1 className="hero-title">
                    Learn Anything from
                    <span className="gradient-text"> YouTube's Best</span>
                </h1>
                <p className="hero-subtitle">
                    Discover curated courses from top instructors. Master new skills,
                    advance your career, and achieve your goals with expert-led content.
                </p>
                <div className="hero-buttons">
                    <Link to="/courses" className="btn-primary">
                        Explore Courses
                        <span className="btn-icon">→</span>
                    </Link>
                    <Link to="/register" className="btn-secondary">
                        Get Started Free
                    </Link>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number">12+</div>
                        <div className="stat-label">Expert Courses</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">100K+</div>
                        <div className="stat-label">Students Learning</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">4.8★</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
