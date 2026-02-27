import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">📚</span>
                    <span className="logo-text">LearnHub</span>
                </Link>

                <div className="navbar-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/courses" className="nav-link">Courses</Link>
                    <Link to="/assessment" className="nav-link">Career Assessment</Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="nav-link">My Courses</Link>
                            <div className="user-menu">
                                <span className="user-name">👋 {user?.username}</span>
                                <button onClick={logout} className="btn-logout">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn-login">Login</Link>
                            <Link to="/register" className="btn-register">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
