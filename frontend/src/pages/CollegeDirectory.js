import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CollegeDirectory.css';

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

const DEGREES = [
    "B.Tech Computer Science", "B.Tech Mechanical", "BBA", "BSc Mathematics", "BA English Literature"
];

const CollegeDirectory = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Filter States
    const [stateFilter, setStateFilter] = useState('');
    const [degreeFilter, setDegreeFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('Government');

    // Data States
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch default colleges or based on filters
    const fetchColleges = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const params = {};
            if (stateFilter) params.state = stateFilter;
            // Since our backend searches by exact match or LIKE on name, we send the degree name. 
            // Better to match how we seeded our degrees.
            if (degreeFilter) params.degree = degreeFilter.split(' ')[0]; // E.g., 'B.Tech'
            if (typeFilter) params.type = typeFilter;

            const response = await axios.get('http://localhost:5000/api/colleges', {
                params,
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            if (response.data.success) {
                setColleges(response.data.data);
            } else {
                setError('Failed to fetch colleges.');
            }
        } catch (err) {
            console.error('Error fetching colleges:', err);
            setError('An error occurred while fetching college data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load initial data
    useEffect(() => {
        if (isAuthenticated) {
            fetchColleges();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchColleges();
    };

    const handleClearFilters = () => {
        setStateFilter('');
        setDegreeFilter('');
        setTypeFilter('Government');
        // Let the effect re-run via a slight timeout or just call fetch manually
        setTimeout(() => fetchColleges(), 50);
    };

    if (!isAuthenticated) {
        return <div className="college-auth-warning">Please login to view the College Directory.</div>;
    }

    return (
        <div className="college-directory-container">
            <div className="directory-header">
                <h1>Government College Directory</h1>
                <p>Find the best institutions tailored to your degree and location preferences.</p>
            </div>

            {/* Filter Section */}
            <div className="filter-card">
                <form onSubmit={handleSearch} className="filter-form">
                    <div className="filter-group">
                        <label htmlFor="state">State / Region</label>
                        <select
                            id="state"
                            value={stateFilter}
                            onChange={(e) => setStateFilter(e.target.value)}
                        >
                            <option value="">All States</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="degree">Recommended Degree</label>
                        <select
                            id="degree"
                            value={degreeFilter}
                            onChange={(e) => setDegreeFilter(e.target.value)}
                        >
                            <option value="">All Degrees</option>
                            {DEGREES.map(deg => (
                                <option key={deg} value={deg}>{deg}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="type">Institution Type</label>
                        <select
                            id="type"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="Government">Government (Public)</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>

                    <div className="filter-actions">
                        <button type="submit" className="btn-primary search-btn">Search Colleges</button>
                        <button type="button" className="btn-secondary clear-btn" onClick={handleClearFilters}>Clear</button>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            <div className="results-container">
                <div className="results-header">
                    <h3>{loading ? 'Searching...' : `Found ${colleges.length} Institutions`}</h3>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="directory-loading">
                        <div className="spinner"></div>
                        <p>Loading directory data...</p>
                    </div>
                ) : (
                    <div className="colleges-grid">
                        {colleges.length > 0 ? (
                            colleges.map((college) => (
                                <div className="college-card" key={college.id}>
                                    <div className="college-badge">{college.type}</div>
                                    <div className="college-info">
                                        <h2 className="college-name">{college.name}</h2>

                                        <div className="college-meta">
                                            <span className="meta-item location">
                                                📍 {college.city}, {college.state}
                                            </span>
                                            {college.degree_name && (
                                                <span className="meta-item degree">
                                                    🎓 {college.degree_name}
                                                </span>
                                            )}
                                            {college.admission_deadline && (
                                                <span className="meta-item deadline" style={{ color: '#ef4444', fontWeight: '600' }}>
                                                    ⏳ Deadline: {new Date(college.admission_deadline).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>

                                        {college.eligibility_criteria && (
                                            <div className="college-eligibility" style={{ marginTop: '15px', padding: '10px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.9rem', color: '#475569', borderLeft: '3px solid #3b82f6' }}>
                                                <strong>Eligibility:</strong> {college.eligibility_criteria}
                                            </div>
                                        )}
                                    </div>

                                    <div className="college-footer" style={{ marginTop: '20px' }}>
                                        <a
                                            href={`https://www.google.com/search?q=${encodeURIComponent(college.name + ' admissions')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="apply-link"
                                        >
                                            Visit Official Site ➔
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <h3>No colleges found.</h3>
                                <p>Try adjusting your search filters to see more results.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="filter-card" style={{ marginTop: '30px', textAlign: 'center' }}>
                <button 
                    className="btn-primary" 
                    style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '30px' }}
                    onClick={() => navigate('/timeline')}
                >
                    Next: Track Admission Timeline
                </button>
            </div>
        </div>
    );
};

export default CollegeDirectory;
