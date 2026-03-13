import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import AssessmentResults from './pages/AssessmentResults';
import AptitudeTest from './pages/AptitudeTest';
import AptitudeResults from './pages/AptitudeResults';
import CareerAdvisor from './pages/CareerAdvisor';
import CollegeDirectory from './pages/CollegeDirectory';
import Timeline from './pages/Timeline';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/assessment" element={<Assessment />} />
                        <Route path="/assessment-results" element={<AssessmentResults />} />
                        <Route path="/aptitude-test" element={<AptitudeTest />} />
                        <Route path="/aptitude-results" element={<AptitudeResults />} />
                        <Route path="/career-advisor" element={<CareerAdvisor />} />
                        <Route path="/colleges" element={<CollegeDirectory />} />
                        <Route path="/timeline" element={<Timeline />} />
                    </Routes>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                                padding: '16px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '600'
                            },
                            success: {
                                iconTheme: {
                                    primary: '#10b981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
