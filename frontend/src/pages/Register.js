import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: ''
    });

    const [validation, setValidation] = useState({
        usernameAvailable: null,
        emailAvailable: null,
        passwordStrength: 0
    });

    const [loading, setLoading] = useState(false);
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    // Check username availability
    useEffect(() => {
        const checkUsername = async () => {
            if (formData.username.length >= 3) {
                setCheckingUsername(true);
                try {
                    const response = await authAPI.checkUsername(formData.username);
                    setValidation(prev => ({
                        ...prev,
                        usernameAvailable: !response.data.exists
                    }));
                } catch (error) {
                    console.error('Username check error:', error);
                }
                setCheckingUsername(false);
            } else {
                setValidation(prev => ({ ...prev, usernameAvailable: null }));
            }
        };

        const timer = setTimeout(checkUsername, 500);
        return () => clearTimeout(timer);
    }, [formData.username]);

    // Check email availability
    useEffect(() => {
        const checkEmail = async () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(formData.email)) {
                setCheckingEmail(true);
                try {
                    const response = await authAPI.checkEmail(formData.email);
                    setValidation(prev => ({
                        ...prev,
                        emailAvailable: !response.data.exists
                    }));
                } catch (error) {
                    console.error('Email check error:', error);
                }
                setCheckingEmail(false);
            } else {
                setValidation(prev => ({ ...prev, emailAvailable: null }));
            }
        };

        const timer = setTimeout(checkEmail, 500);
        return () => clearTimeout(timer);
    }, [formData.email]);

    // Check password strength
    useEffect(() => {
        const checkPasswordStrength = () => {
            let strength = 0;
            const password = formData.password;

            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[@$!%*?&]/.test(password)) strength++;

            setValidation(prev => ({ ...prev, passwordStrength: strength }));
        };

        checkPasswordStrength();
    }, [formData.password]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!validation.usernameAvailable) {
            toast.error('Username is not available');
            return;
        }

        if (!validation.emailAvailable) {
            toast.error('Email is already registered');
            return;
        }

        if (validation.passwordStrength < 4) {
            toast.error('Password is too weak. Please use a stronger password.');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.register(formData);

            if (response.data.success) {
                toast.success('🎉 Registration successful! Welcome aboard!');
                login(response.data.data, response.data.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);

            if (error.response?.data?.errors) {
                error.response.data.errors.forEach(err => {
                    toast.error(err.message);
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthLabel = () => {
        if (validation.passwordStrength < 4) return 'Weak';
        if (validation.passwordStrength < 6) return 'Moderate';
        return 'Strong';
    };

    const getPasswordStrengthColor = () => {
        if (validation.passwordStrength < 4) return '#ef4444';
        if (validation.passwordStrength < 6) return '#f59e0b';
        return '#10b981';
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Create Account</h1>
                        <p>Join thousands of learners today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                minLength="2"
                            />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <div className="input-with-validation">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Choose a unique username"
                                    required
                                    minLength="3"
                                    pattern="[a-zA-Z0-9_]+"
                                    title="Username can only contain letters, numbers, and underscores"
                                />
                                {checkingUsername && <span className="validation-spinner">⏳</span>}
                                {!checkingUsername && validation.usernameAvailable === true && (
                                    <span className="validation-success">✓</span>
                                )}
                                {!checkingUsername && validation.usernameAvailable === false && (
                                    <span className="validation-error">✗</span>
                                )}
                            </div>
                            {validation.usernameAvailable === false && (
                                <span className="error-message">Username already taken</span>
                            )}
                            {validation.usernameAvailable === true && (
                                <span className="success-message">Username available!</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-with-validation">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                                {checkingEmail && <span className="validation-spinner">⏳</span>}
                                {!checkingEmail && validation.emailAvailable === true && (
                                    <span className="validation-success">✓</span>
                                )}
                                {!checkingEmail && validation.emailAvailable === false && (
                                    <span className="validation-error">✗</span>
                                )}
                            </div>
                            {validation.emailAvailable === false && (
                                <span className="error-message">Email already registered</span>
                            )}
                            {validation.emailAvailable === true && (
                                <span className="success-message">Email available!</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                required
                                minLength="8"
                            />
                            {formData.password && (
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div
                                            className="strength-fill"
                                            style={{
                                                width: `${(validation.passwordStrength / 6) * 100}%`,
                                                background: getPasswordStrengthColor()
                                            }}
                                        ></div>
                                    </div>
                                    <span
                                        className="strength-label"
                                        style={{ color: getPasswordStrengthColor() }}
                                    >
                                        {getPasswordStrengthLabel()}
                                    </span>
                                </div>
                            )}
                            <small className="password-hint">
                                Must contain: 8+ characters, uppercase, lowercase, number, special character
                            </small>
                        </div>

                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading || !validation.usernameAvailable || !validation.emailAvailable}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
