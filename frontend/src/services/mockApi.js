/* eslint-disable no-throw-literal */
// Mock API for testing frontend without backend
// Simulates API responses with fake data

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock courses data
const mockCourses = [
    {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        description: 'Master web development with HTML, CSS, JavaScript, React, Node.js and more.',
        instructor: 'Dr. Angela Yu',
        youtube_url: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        duration: '65 hours',
        level: 'Beginner',
        category: 'Web Development',
        rating: 4.8,
        students_enrolled: 15420
    },
    {
        id: 2,
        title: 'JavaScript - The Complete Guide',
        description: 'Modern JavaScript from the beginning - all the way up to JS expert level!',
        instructor: 'Maximilian Schwarzmüller',
        youtube_url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
        thumbnail_url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
        duration: '52 hours',
        level: 'Intermediate',
        category: 'Programming',
        rating: 4.9,
        students_enrolled: 12350
    },
    {
        id: 3,
        title: 'React - The Complete Guide',
        description: 'Dive deep into React.js! Learn React, Hooks, Redux, React Router, Next.js.',
        instructor: 'Maximilian Schwarzmüller',
        youtube_url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        duration: '48 hours',
        level: 'Intermediate',
        category: 'Web Development',
        rating: 4.9,
        students_enrolled: 18900
    },
    {
        id: 4,
        title: 'Python for Everybody',
        description: 'Learn Python programming from scratch. Perfect for beginners!',
        instructor: 'Dr. Chuck Severance',
        youtube_url: 'https://www.youtube.com/watch?v=8DvywoWv6fI',
        thumbnail_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
        duration: '45 hours',
        level: 'Beginner',
        category: 'Programming',
        rating: 4.7,
        students_enrolled: 22100
    },
    {
        id: 5,
        title: 'Machine Learning A-Z',
        description: 'Learn to create Machine Learning Algorithms in Python and R.',
        instructor: 'Kirill Eremenko',
        youtube_url: 'https://www.youtube.com/watch?v=7eh4d6sabA0',
        thumbnail_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
        duration: '44 hours',
        level: 'Advanced',
        category: 'Data Science',
        rating: 4.8,
        students_enrolled: 9870
    },
    {
        id: 6,
        title: 'Node.js - The Complete Guide',
        description: 'Master Node.js, build REST APIs, GraphQL APIs, add Authentication.',
        instructor: 'Maximilian Schwarzmüller',
        youtube_url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
        thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        duration: '40 hours',
        level: 'Intermediate',
        category: 'Backend Development',
        rating: 4.8,
        students_enrolled: 11250
    }
];

// Mock users storage (in-memory)
let mockUsers = [
    {
        id: 1,
        username: 'demouser',
        email: 'demo@example.com',
        password: 'Demo@123456', // In real app, this would be hashed
        full_name: 'Demo User'
    }
];

// Mock enrollments
let mockEnrollments = [];

// Mock current user
let currentUser = null;

// Mock Auth API
export const mockAuthAPI = {
    register: async (userData) => {
        await delay();

        // Check if username exists
        if (mockUsers.find(u => u.username === userData.username)) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Username already taken'
                    }
                }
            };
        }

        // Check if email exists
        if (mockUsers.find(u => u.email === userData.email)) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Email already registered'
                    }
                }
            };
        }

        // Create new user
        const newUser = {
            id: mockUsers.length + 1,
            ...userData
        };
        mockUsers.push(newUser);
        currentUser = newUser;

        return {
            data: {
                success: true,
                message: 'User registered successfully',
                data: {
                    userId: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    full_name: newUser.full_name,
                    token: 'mock-jwt-token-' + newUser.id
                }
            }
        };
    },

    login: async (credentials) => {
        await delay();

        const user = mockUsers.find(u => u.email === credentials.email);

        if (!user || user.password !== credentials.password) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Invalid email or password'
                    }
                }
            };
        }

        currentUser = user;

        return {
            data: {
                success: true,
                message: 'Login successful',
                data: {
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    token: 'mock-jwt-token-' + user.id
                }
            }
        };
    },

    checkUsername: async (username) => {
        await delay(300);
        const exists = mockUsers.some(u => u.username === username);
        return {
            data: {
                success: true,
                exists,
                message: exists ? 'Username already taken' : 'Username available'
            }
        };
    },

    checkEmail: async (email) => {
        await delay(300);
        const exists = mockUsers.some(u => u.email === email);
        return {
            data: {
                success: true,
                exists,
                message: exists ? 'Email already registered' : 'Email available'
            }
        };
    },

    getProfile: async () => {
        await delay();
        if (!currentUser) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Not authenticated'
                    }
                }
            };
        }
        return {
            data: {
                success: true,
                data: currentUser
            }
        };
    }
};

// Mock Course API
export const mockCourseAPI = {
    getAllCourses: async () => {
        await delay();
        return {
            data: {
                success: true,
                count: mockCourses.length,
                data: mockCourses
            }
        };
    },

    getCourseById: async (id) => {
        await delay();
        const course = mockCourses.find(c => c.id === parseInt(id));
        if (!course) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Course not found'
                    }
                }
            };
        }
        return {
            data: {
                success: true,
                data: course
            }
        };
    },

    searchCourses: async (query) => {
        await delay();
        const results = mockCourses.filter(c =>
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.description.toLowerCase().includes(query.toLowerCase())
        );
        return {
            data: {
                success: true,
                count: results.length,
                data: results
            }
        };
    },

    getCoursesByCategory: async (category) => {
        await delay();
        const results = mockCourses.filter(c => c.category === category);
        return {
            data: {
                success: true,
                count: results.length,
                data: results
            }
        };
    },

    enrollInCourse: async (courseId) => {
        await delay();

        if (!currentUser) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Please login to enroll'
                    }
                }
            };
        }

        // Check if already enrolled
        const alreadyEnrolled = mockEnrollments.some(
            e => e.userId === currentUser.id && e.courseId === courseId
        );

        if (alreadyEnrolled) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Already enrolled in this course'
                    }
                }
            };
        }

        // Add enrollment
        mockEnrollments.push({
            id: mockEnrollments.length + 1,
            userId: currentUser.id,
            courseId: courseId,
            enrolled_at: new Date().toISOString(),
            progress: 0,
            completed: false
        });

        return {
            data: {
                success: true,
                message: 'Successfully enrolled in course'
            }
        };
    },

    getMyEnrolledCourses: async () => {
        await delay();

        if (!currentUser) {
            throw {
                response: {
                    data: {
                        success: false,
                        message: 'Please login'
                    }
                }
            };
        }

        const userEnrollments = mockEnrollments.filter(e => e.userId === currentUser.id);
        const enrolledCourses = userEnrollments.map(enrollment => {
            const course = mockCourses.find(c => c.id === enrollment.courseId);
            return {
                ...course,
                enrolled_at: enrollment.enrolled_at,
                progress: enrollment.progress,
                completed: enrollment.completed
            };
        });

        return {
            data: {
                success: true,
                count: enrolledCourses.length,
                data: enrolledCourses
            }
        };
    }
};
