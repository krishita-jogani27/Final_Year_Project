import axios from 'axios';
import { mockAuthAPI, mockCourseAPI } from './mockApi';

// ========================================
// CONFIGURATION: Switch between Real API and Mock API
// ========================================
// Set to 'mock' for frontend-only testing
// Set to 'real' when backend is running
const API_MODE = 'real'; // Changed back to 'real' since backend is successfully running

// ========================================
// REAL API (Backend Required)
// ========================================
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Real Auth API
const realAuthAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    checkUsername: (username) => api.post('/auth/check-username', { username }),
    checkEmail: (email) => api.post('/auth/check-email', { email }),
    getProfile: () => api.get('/auth/me')
};

// Real Course API
const realCourseAPI = {
    getAllCourses: () => api.get('/courses'),
    getCourseById: (id) => api.get(`/courses/${id}`),
    searchCourses: (query) => api.get(`/courses/search/${query}`),
    getCoursesByCategory: (category) => api.get(`/courses/category/${category}`),
    enrollInCourse: (courseId) => api.post('/courses/enroll', { courseId }),
    getMyEnrolledCourses: () => api.get('/courses/my/enrolled')
};


// ========================================
// EXPORT: Based on API_MODE
// ========================================
export const authAPI = API_MODE === 'mock' ? mockAuthAPI : realAuthAPI;
export const courseAPI = API_MODE === 'mock' ? mockCourseAPI : realCourseAPI;

// Log current mode
console.log(`🔧 API Mode: ${API_MODE.toUpperCase()}`);
if (API_MODE === 'mock') {
    console.log('📝 Using MOCK API - Frontend only mode');
    console.log('💡 To use real backend, change API_MODE to "real" in src/services/api.js');
} else {
    console.log('🌐 Using REAL API - Backend required at http://localhost:5000');
}

export default api;
