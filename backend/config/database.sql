-- Create Database
CREATE DATABASE IF NOT EXISTS youtube_course_db;
USE youtube_course_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    youtube_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    students_enrolled INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_level (level)
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    INDEX idx_user_id (user_id),
    INDEX idx_course_id (course_id)
);

-- Insert Sample YouTube Courses
INSERT INTO courses (title, description, instructor, youtube_url, thumbnail_url, duration, level, category, rating, students_enrolled) VALUES
('Complete Web Development Bootcamp', 'Master web development with HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.', 'Dr. Angela Yu', 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', '65 hours', 'Beginner', 'Web Development', 4.8, 15420),

('JavaScript - The Complete Guide', 'Modern JavaScript from the beginning - all the way up to JS expert level! Learn all the latest features and best practices.', 'Maximilian Schwarzmüller', 'https://www.youtube.com/watch?v=PkZNo7MFNFg', 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800', '52 hours', 'Intermediate', 'Programming', 4.9, 12350),

('React - The Complete Guide', 'Dive deep into React.js! Learn React, Hooks, Redux, React Router, Next.js and way more with hands-on projects.', 'Maximilian Schwarzmüller', 'https://www.youtube.com/watch?v=Ke90Tje7VS0', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', '48 hours', 'Intermediate', 'Web Development', 4.9, 18900),

('Python for Everybody', 'Learn Python programming from scratch. Perfect for beginners! Covers data structures, web scraping, databases and more.', 'Dr. Chuck Severance', 'https://www.youtube.com/watch?v=8DvywoWv6fI', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800', '45 hours', 'Beginner', 'Programming', 4.7, 22100),

('Machine Learning A-Z', 'Learn to create Machine Learning Algorithms in Python and R. Includes code templates for real-world applications.', 'Kirill Eremenko', 'https://www.youtube.com/watch?v=7eh4d6sabA0', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', '44 hours', 'Advanced', 'Data Science', 4.8, 9870),

('Node.js - The Complete Guide', 'Master Node.js, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL and much more!', 'Maximilian Schwarzmüller', 'https://www.youtube.com/watch?v=Oe421EPjeBE', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', '40 hours', 'Intermediate', 'Backend Development', 4.8, 11250),

('Complete SQL Bootcamp', 'Become an expert at SQL! Learn PostgreSQL, MySQL, and database design. Perfect for data analysis and backend development.', 'Jose Portilla', 'https://www.youtube.com/watch?v=HXV3zeQKqGY', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800', '35 hours', 'Beginner', 'Database', 4.7, 13400),

('Data Structures and Algorithms', 'Master DSA in Java, Python or C++. Essential for coding interviews at top tech companies like Google, Amazon, Microsoft.', 'Abdul Bari', 'https://www.youtube.com/watch?v=0IAPZzGSbME', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800', '55 hours', 'Advanced', 'Computer Science', 4.9, 16700),

('Complete Digital Marketing Course', 'Master digital marketing! SEO, YouTube Marketing, Email Marketing, Social Media Marketing, and much more.', 'Neil Patel', 'https://www.youtube.com/watch?v=nU-IIXBWlS4', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', '38 hours', 'Beginner', 'Marketing', 4.6, 8920),

('UI/UX Design Masterclass', 'Learn UI/UX design with Figma. Create beautiful user interfaces and amazing user experiences for web and mobile apps.', 'Daniel Schifano', 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', '42 hours', 'Intermediate', 'Design', 4.8, 10340),

('Docker and Kubernetes Complete Guide', 'Build, test, and deploy Docker applications with Kubernetes. Learn container orchestration and microservices.', 'Stephen Grider', 'https://www.youtube.com/watch?v=3c-iBn73dDE', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800', '36 hours', 'Advanced', 'DevOps', 4.9, 7650),

('Complete Ethical Hacking Course', 'Learn ethical hacking from scratch! Become a penetration tester, learn network security, and web application security.', 'Zaid Sabih', 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', '50 hours', 'Advanced', 'Cybersecurity', 4.7, 6890);
