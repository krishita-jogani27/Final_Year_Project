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
    education_level ENUM('10th', '12th', 'Graduate') DEFAULT '12th',
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

-- ==========================================
-- QUIZ DATABASE STRUCTURE
-- ==========================================

-- Aptitude Categories Table
CREATE TABLE IF NOT EXISTS aptitude_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- e.g., Logical, Quantitative, Verbal, Technical
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    question_text TEXT NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES aptitude_categories(id) ON DELETE CASCADE
);

-- Options Table
CREATE TABLE IF NOT EXISTS options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- User Quiz Attempts Table
CREATE TABLE IF NOT EXISTS user_quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT DEFAULT 0,
    total_questions INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Answers Table
CREATE TABLE IF NOT EXISTS user_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option_id INT,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (attempt_id) REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES options(id) ON DELETE SET NULL
);

-- ==========================================
-- PHASE 2: DEGREE & CAREER RECOMMENDATION
-- ==========================================

-- Degrees Table
CREATE TABLE IF NOT EXISTS degrees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g., B.Tech, BBA, BSc
    stream VARCHAR(50) NOT NULL,
    description TEXT,
    eligible_from ENUM('10th', '12th', 'Graduate') DEFAULT '12th'
);

-- Career Roles Table
CREATE TABLE IF NOT EXISTS career_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL, -- e.g., Software Engineer, CA, IAS
    description TEXT,
    average_salary VARCHAR(50)
);

-- Degree to Career Mapping Table
CREATE TABLE IF NOT EXISTS degree_career_map (
    degree_id INT NOT NULL,
    career_role_id INT NOT NULL,
    PRIMARY KEY (degree_id, career_role_id),
    FOREIGN KEY (degree_id) REFERENCES degrees(id) ON DELETE CASCADE,
    FOREIGN KEY (career_role_id) REFERENCES career_roles(id) ON DELETE CASCADE
);

-- Category to Degree Mapping Table (Links Aptitude Strengths to Degrees)
CREATE TABLE IF NOT EXISTS category_degree_map (
    aptitude_category_id INT NOT NULL,
    degree_id INT NOT NULL,
    weight_score INT DEFAULT 0,
    PRIMARY KEY (aptitude_category_id, degree_id),
    FOREIGN KEY (aptitude_category_id) REFERENCES aptitude_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (degree_id) REFERENCES degrees(id) ON DELETE CASCADE
);

-- ==========================================
-- PHASE 3: EXAM MAPPING
-- ==========================================

-- Exams Table
CREATE TABLE IF NOT EXISTS exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g., JEE, NEET, UPSC
    description TEXT,
    eligibility TEXT,
    exam_date VARCHAR(100)
);

-- Career to Exam Mapping Table
CREATE TABLE IF NOT EXISTS career_exam_map (
    career_role_id INT NOT NULL,
    exam_id INT NOT NULL,
    PRIMARY KEY (career_role_id, exam_id),
    FOREIGN KEY (career_role_id) REFERENCES career_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);

-- ==========================================
-- PHASE 4: COLLEGE DIRECTORY
-- ==========================================

-- Colleges Table
CREATE TABLE IF NOT EXISTS colleges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    degree_id INT,
    city VARCHAR(100),
    state VARCHAR(100),
    type VARCHAR(50) DEFAULT 'Government', -- Government or Private
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    FOREIGN KEY (degree_id) REFERENCES degrees(id) ON DELETE SET NULL
);

-- ==========================================
-- PHASE 5: TIMELINE & NOTIFICATION SYSTEM
-- ==========================================

-- Career Timelines Table
CREATE TABLE IF NOT EXISTS career_timelines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    career_role_id INT NOT NULL,
    step_title VARCHAR(255) NOT NULL,
    step_description TEXT,
    recommended_age VARCHAR(50),
    FOREIGN KEY (career_role_id) REFERENCES career_roles(id) ON DELETE CASCADE
);

-- Notifications Table (In-app)
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- ==========================================
-- QUIZ SEED DATA
-- 24 Sample Questions (6 per category)
-- ==========================================

USE youtube_course_db;

-- Clear existing data to prevent duplicate key errors
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE user_answers;
TRUNCATE TABLE user_quiz_attempts;
TRUNCATE TABLE options;
TRUNCATE TABLE questions;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Categories
INSERT INTO aptitude_categories (id, name, description) VALUES
(1, 'Logical', 'Tests logical reasoning, patterns, and problem-solving skills.'),
(2, 'Quantitative', 'Tests mathematical ability, numbers, and data interpretation.'),
(3, 'Verbal', 'Tests English vocabulary, grammar, and reading comprehension.'),
(4, 'Technical', 'Tests knowledge of programming, computer science, and IT concepts.')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Insert Questions & Options

-- ================= LOGICAL REASONING =================
-- Question 1
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (1, 1, 'Look at this series: 2, 6, 18, 54, ... What number should come next?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(1, '108', FALSE), (1, '148', FALSE), (1, '162', TRUE), (1, '216', FALSE);

-- Question 2
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (2, 1, 'Which word does NOT belong with the others?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(2, 'Parsley', FALSE), (2, 'Basil', FALSE), (2, 'Dill', FALSE), (2, 'Mayonnaise', TRUE);

-- Question 3
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (3, 1, 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(3, 'True', TRUE), (3, 'False', FALSE), (3, 'Uncertain', FALSE), (3, 'None of the above', FALSE);

-- Question 4
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (4, 1, 'Odometer is to mileage as compass is to:', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(4, 'Speed', FALSE), (4, 'Hiking', FALSE), (4, 'Needle', FALSE), (4, 'Direction', TRUE);

-- Question 5
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (5, 1, 'Four people witnessed a mugging. Each gave a different description of the mugger. Which description is probably right?', 'hard');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(5, 'He was average height, thin, and middle-aged.', FALSE), 
(5, 'He was tall, thin, and middle-aged.', TRUE), 
(5, 'He was tall, thin, and young.', FALSE), 
(5, 'He was tall, of average weight, and middle-aged.', FALSE); -- Note: logical deduction depends on common traits among witnesses

-- Question 6
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (6, 1, 'A tiebreaker is an additional contest or period of play designed to establish a winner among tied contestants. Which situation below is the best example of a Tiebreaker?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(6, 'At halftime, the score is tied at 28.', FALSE), 
(6, 'Mary and Megan have each scored three goals in the game.', FALSE), 
(6, 'The referee tosses a coin to decide which team will have possession first.', FALSE), 
(6, 'The Sharks and the Bears each finished with 14 points, and they are now battling it out in a five-minute overtime.', TRUE);


-- ================= QUANTITATIVE =================
-- Question 7
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (7, 2, 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(7, '120 metres', FALSE), (7, '180 metres', FALSE), (7, '150 metres', TRUE), (7, '320 metres', FALSE);

-- Question 8
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (8, 2, 'The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(8, '4 years', TRUE), (8, '8 years', FALSE), (8, '10 years', FALSE), (8, 'None of these', FALSE);

-- Question 9
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (9, 2, 'A is two years older than B who is twice as old as C. If the total of the ages of A, B and C be 27, then how old is B?', 'hard');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(9, '7', FALSE), (9, '8', FALSE), (9, '9', FALSE), (9, '10', TRUE);

-- Question 10
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (10, 2, 'What is 15 percent of 60?', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(10, '6', FALSE), (10, '9', TRUE), (10, '12', FALSE), (10, '15', FALSE);

-- Question 11
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (11, 2, 'If 5 spiders can catch 5 flies in 5 minutes, how many spiders are needed to catch 100 flies in 100 minutes?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(11, '1', FALSE), (11, '5', TRUE), (11, '100', FALSE), (11, '500', FALSE);

-- Question 12
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (12, 2, 'Solve: 8 + 8 / 2 * 4', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(12, '24', TRUE), (12, '32', FALSE), (12, '16', FALSE), (12, '12', FALSE);


-- ================= VERBAL =================
-- Question 13
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (13, 3, 'Choose the correct synonym for "Benevolent".', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(13, 'Cruel', FALSE), (13, 'Friendly', FALSE), (13, 'Charitable', TRUE), (13, 'Miserly', FALSE);

-- Question 14
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (14, 3, 'Which of the following is an antonym for "Expand"?', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(14, 'Contract', TRUE), (14, 'Grow', FALSE), (14, 'Enlarge', FALSE), (14, 'Spread', FALSE);

-- Question 15
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (15, 3, 'Find the correctly spelt word.', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(15, 'Accomodate', FALSE), (15, 'Accommodate', TRUE), (15, 'Acomodate', FALSE), (15, 'Acommodate', FALSE);

-- Question 16
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (16, 3, 'Fill in the blank: She has been living here _____ 1995.', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(16, 'for', FALSE), (16, 'since', TRUE), (16, 'from', FALSE), (16, 'until', FALSE);

-- Question 17
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (17, 3, 'What is the meaning of the idiom "A blessing in disguise"?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(17, 'A favorable situation disguised as a bad one.', TRUE), 
(17, 'A person who is secretly blessed.', FALSE), 
(17, 'Something good that is not recognized at first.', FALSE), 
(17, 'A bad event that has no positive outcome.', FALSE);

-- Question 18
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (18, 3, 'Identify the error in this sentence: "He don''t like apples."', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(18, 'He', FALSE), (18, 'don''t', TRUE), (18, 'like', FALSE), (18, 'apples', FALSE);


-- ================= TECHNICAL =================
-- Question 19
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (19, 4, 'Which of the following is NOT a fundamental data type in C++?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(19, 'int', FALSE), (19, 'float', FALSE), (19, 'string', TRUE), (19, 'char', FALSE);

-- Question 20
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (20, 4, 'What does HTML stand for?', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(20, 'Hyper Text Markup Language', TRUE), 
(20, 'High Text Markup Language', FALSE), 
(20, 'Hyper Tabular Markup Language', FALSE), 
(20, 'None of these', FALSE);

-- Question 21
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (21, 4, 'Which database is used in this very application?', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(21, 'MongoDB', FALSE), (21, 'PostgreSQL', FALSE), (21, 'MySQL', TRUE), (21, 'SQLite', FALSE);

-- Question 22
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (22, 4, 'In Object-Oriented Programming, what does "Polymorphism" mean?', 'hard');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(22, 'Hiding the implementation details from the user.', FALSE), 
(22, 'The ability of different objects to respond to the same method call in their own way.', TRUE), 
(22, 'Inheriting properties from a parent class.', FALSE), 
(22, 'Binding data and methods together into a single unit.', FALSE);

-- Question 23
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (23, 4, 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(23, 'O(1)', FALSE), (23, 'O(n)', FALSE), (23, 'O(log n)', TRUE), (23, 'O(n log n)', FALSE);

-- Question 24
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (24, 4, 'Which protocol is used for secure communication over the Internet?', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(24, 'HTTP', FALSE), (24, 'FTP', FALSE), (24, 'HTTPS', TRUE), (24, 'SMTP', FALSE);

USE youtube_course_db;

-- Clear existing data if run multiple times
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE category_degree_map;
TRUNCATE TABLE degree_career_map;
TRUNCATE TABLE career_roles;
TRUNCATE TABLE degrees;
SET FOREIGN_KEY_CHECKS = 1;

-- ==========================================
-- 1. Insert Sample Degrees
-- ==========================================
INSERT INTO degrees (id, name, stream, description) VALUES
(1, 'B.Tech Computer Science', 'Engineering', 'Focuses on software development, algorithms, and computing systems.'),
(2, 'B.Tech Mechanical', 'Engineering', 'Deals with the design, manufacturing, and maintenance of mechanical systems.'),
(3, 'BBA', 'Management', 'Bachelor of Business Administration, covering management, finance, and marketing.'),
(4, 'BSc Mathematics', 'Science', 'Deep dive into pure and applied mathematics, statistics, and logical analysis.'),
(5, 'BA English Literature', 'Arts', 'Focuses on writing, communication, and critical reading of texts.');

-- ==========================================
-- 2. Insert Career Roles
-- ==========================================
INSERT INTO career_roles (id, title, description, average_salary) VALUES
(1, 'Software Engineer', 'Builds and maintains software applications and systems.', '8-15 LPA'),
(2, 'Data Scientist', 'Analyzes complex data to extract insights and build predictive models.', '10-20 LPA'),
(3, 'Marketing Manager', 'Develops and executes strategies to promote brands and products.', '6-12 LPA'),
(4, 'Mechanical Engineer', 'Designs, builds, and analyzes mechanical and thermal devices.', '5-10 LPA'),
(5, 'Content Strategist', 'Creates, edits, and manages written content for digital media.', '5-9 LPA');

-- ==========================================
-- 3. Map Degrees to Careers
-- ==========================================
INSERT INTO degree_career_map (degree_id, career_role_id) VALUES
(1, 1), -- B.Tech CS -> Software Engineer
(1, 2), -- B.Tech CS -> Data Scientist
(2, 4), -- B.Tech Mech -> Mechanical Engineer
(3, 3), -- BBA -> Marketing Manager
(4, 2), -- BSc Math -> Data Scientist
(5, 5); -- BA English -> Content Strategist

-- ==========================================
-- 4. Map Aptitude Categories to Degrees (Weights)
-- Assuming common categories: Technical, Logical, Quantitative, Verbal
-- High weight = Highly recommended for that strength
-- ==========================================
-- We will link these using subqueries to ensure the category ID matches your existing aptitude_categories table.
INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 1, 95 FROM aptitude_categories WHERE name = 'Technical';

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 1, 85 FROM aptitude_categories WHERE name = 'Logical';

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 2, 85 FROM aptitude_categories WHERE name = 'Quantitative';

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 3, 90 FROM aptitude_categories WHERE name = 'Verbal';

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 4, 95 FROM aptitude_categories WHERE name = 'Quantitative';

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 5, 95 FROM aptitude_categories WHERE name = 'Verbal';

SELECT 'Phase 2 Database Seeded Successfully!' AS Status;
USE youtube_course_db;

-- 1. Create Exams Table
CREATE TABLE IF NOT EXISTS exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g., JEE, NEET, UPSC
    description TEXT,
    eligibility TEXT,
    exam_date VARCHAR(100)
);

-- 2. Create Career to Exam Mapping Table
CREATE TABLE IF NOT EXISTS career_exam_map (
    career_role_id INT NOT NULL,
    exam_id INT NOT NULL,
    PRIMARY KEY (career_role_id, exam_id),
    FOREIGN KEY (career_role_id) REFERENCES career_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);

SELECT 'Phase 3 Tables created successfully!' AS Status;
USE youtube_course_db;

-- 1. Insert Sample Exams
INSERT INTO exams (id, name, description, eligibility, exam_date) VALUES
(1, 'JEE Main', 'Joint Entrance Examination for Engineering', '10+2 with Physics, Chemistry, Math', 'January & April'),
(2, 'JEE Advanced', 'Admission to IITs', 'Top 2.5 Lakh in JEE Main', 'June'),
(3, 'GATE', 'Graduate Aptitude Test in Engineering (for PG/Jobs)', 'B.Tech/BE completed or final year', 'February'),
(4, 'CAT', 'Common Admission Test for MBA/PGDM', 'Bachelor’s degree with 50%', 'November'),
(5, 'UPSC CSE', 'Civil Services Examination for IAS/IPS', 'Bachelor’s degree in any discipline', 'May (Prelims), Sept (Mains)');

-- 2. Map Careers to Exams (career_role_id, exam_id)
INSERT INTO career_exam_map (career_role_id, exam_id) VALUES
(1, 1), -- Software Engineer -> JEE Main
(1, 2), -- Software Engineer -> JEE Advanced
(4, 1), -- Mechanical Engineer -> JEE Main
(4, 3), -- Mechanical Engineer -> GATE (often required for PSUs)
(3, 4); -- Marketing Manager -> CAT (often requires MBA)

-- Note: Data Scientist (2) and Content Strategist (5) might not have strict nationwide entrance exams in the same way, 
-- or they rely on University specific tests. We can leave them unmapped to show how the API handles empty exam lists.

SELECT 'Phase 3 Exams Seeded Successfully!' AS Status;
USE youtube_course_db;

-- 1. Create Colleges Table
CREATE TABLE IF NOT EXISTS colleges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    degree_id INT,
    city VARCHAR(100),
    state VARCHAR(100),
    type VARCHAR(50) DEFAULT 'Government',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    FOREIGN KEY (degree_id) REFERENCES degrees(id) ON DELETE SET NULL
);

SELECT 'Phase 4 Colleges Table Created Successfully!' AS Status;
USE youtube_course_db;

-- Insert Sample Colleges
INSERT INTO colleges (name, degree_id, city, state, type, latitude, longitude) VALUES
('Indian Institute of Technology (IIT) Jodhpur', 1, 'Jodhpur', 'Rajasthan', 'Government', 26.4695, 73.1114),
('Malviya National Institute of Technology (MNIT)', 1, 'Jaipur', 'Rajasthan', 'Government', 26.8630, 75.8105),
('University of Rajasthan', 4, 'Jaipur', 'Rajasthan', 'Government', 26.8854, 75.8203),
('Indian Institute of Management (IIM) Udaipur', 3, 'Udaipur', 'Rajasthan', 'Government', 24.5255, 73.7436),
('College of Engineering Pune (COEP)', 1, 'Pune', 'Maharashtra', 'Government', 18.5293, 73.8566),
('Indian Institute of Technology (IIT) Bombay', 1, 'Mumbai', 'Maharashtra', 'Government', 19.1334, 72.9133),
('Veermata Jijabai Technological Institute (VJTI)', 1, 'Mumbai', 'Maharashtra', 'Government', 19.0222, 72.8561),
('Savitribai Phule Pune University', 5, 'Pune', 'Maharashtra', 'Government', 18.5538, 73.8248),
('Delhi Technological University (DTU)', 1, 'New Delhi', 'Delhi', 'Government', 28.7499, 77.1165),
('Indian Institute of Technology (IIT) Delhi', 1, 'New Delhi', 'Delhi', 'Government', 28.5450, 77.1926),
('Jawaharlal Nehru University (JNU)', 5, 'New Delhi', 'Delhi', 'Government', 28.5400, 77.1666),
('Faculty of Management Studies (FMS)', 3, 'New Delhi', 'Delhi', 'Government', 28.6852, 77.2070);

SELECT 'Phase 4 College Data Seeded Successfully!' AS Status;
USE youtube_course_db;

-- 1. Create Career Timelines Table
CREATE TABLE IF NOT EXISTS career_timelines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    career_role_id INT NOT NULL,
    step_title VARCHAR(255) NOT NULL,
    step_description TEXT,
    recommended_age VARCHAR(50),
    FOREIGN KEY (career_role_id) REFERENCES career_roles(id) ON DELETE CASCADE
);

-- 2. Create Notifications Table (In-app)
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

SELECT 'Phase 5 Timeline and Notifications Tables Created Successfully!' AS Status;
USE youtube_course_db;

-- 1. Alter Users Table
ALTER TABLE users 
ADD COLUMN education_level ENUM('10th', '12th', 'Graduate') DEFAULT '12th' AFTER full_name;

-- 2. Alter Degrees Table
ALTER TABLE degrees 
ADD COLUMN eligible_from ENUM('10th', '12th', 'Graduate') DEFAULT '12th' AFTER description;

-- 3. Insert New Degrees for '10th' level 
-- (Assuming they take the test in 10th grade and want to know which stream to choose)
INSERT INTO degrees (name, stream, description, eligible_from) VALUES
('Science Stream (PCM)', 'Science', 'Physics, Chemistry, Math for Engineering & Architecture', '10th'),
('Science Stream (PCB)', 'Science', 'Physics, Chemistry, Biology for Medical & Research', '10th'),
('Commerce Stream', 'Commerce', 'Accounts, Business Studies, Economics for CA, CS, BBA', '10th'),
('Arts / Humanities', 'Arts', 'History, Political Science, Geography for UPSC, Law, Design', '10th'),
('Diploma in Engineering', 'Polytechnic', '3-year practical engineering diploma after 10th', '10th');

-- 4. Insert New Programs for 'Graduate' level 
-- (Assuming they take the test after B.Tech/BBA and want Master's recommendations)
INSERT INTO degrees (name, stream, description, eligible_from) VALUES
('Master of Business Administration (MBA)', 'Management', 'Advanced business and leadership program', 'Graduate'),
('Master of Technology (M.Tech)', 'Engineering', 'Specialized postgraduate engineering degree', 'Graduate'),
('Data Science Certification/PG', 'IT / Software', 'Specialized track for aspiring Data Scientists', 'Graduate'),
('UPSC / Civil Services Prep', 'Government', 'Preparation for top-tier government roles', 'Graduate');

-- 5. Map 10th Streams to Aptitude Categories
-- Let's retrieve IDs of our inserted degrees. To be safe, we use subqueries based on names.
INSERT INTO category_degree_map (aptitude_category_id, degree_id, weight_score) VALUES
((SELECT id FROM aptitude_categories WHERE name = 'Logical Reasoning' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Science Stream (PCM)' LIMIT 1), 90),
((SELECT id FROM aptitude_categories WHERE name = 'Logical Reasoning' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Arts / Humanities' LIMIT 1), 70),
((SELECT id FROM aptitude_categories WHERE name = 'Technical & Coding' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Science Stream (PCM)' LIMIT 1), 95),
((SELECT id FROM aptitude_categories WHERE name = 'Technical & Coding' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Diploma in Engineering' LIMIT 1), 85),
((SELECT id FROM aptitude_categories WHERE name = 'Quantitative Aptitude' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Commerce Stream' LIMIT 1), 90),
((SELECT id FROM aptitude_categories WHERE name = 'Verbal Ability' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Arts / Humanities' LIMIT 1), 85);

-- 6. Map Graduate Degrees to Aptitude Categories
INSERT INTO category_degree_map (aptitude_category_id, degree_id, weight_score) VALUES
((SELECT id FROM aptitude_categories WHERE name = 'Logical Reasoning' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Master of Business Administration (MBA)' LIMIT 1), 85),
((SELECT id FROM aptitude_categories WHERE name = 'Quantitative Aptitude' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Master of Business Administration (MBA)' LIMIT 1), 80),
((SELECT id FROM aptitude_categories WHERE name = 'Technical & Coding' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Master of Technology (M.Tech)' LIMIT 1), 90),
((SELECT id FROM aptitude_categories WHERE name = 'Technical & Coding' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Data Science Certification/PG' LIMIT 1), 95),
((SELECT id FROM aptitude_categories WHERE name = 'General Knowledge' LIMIT 1), (SELECT id FROM degrees WHERE name = 'UPSC / Civil Services Prep' LIMIT 1), 95);

SELECT 'Phase 6 DB Migration and Seeding Successful!' AS Status;
USE youtube_course_db;

-- 5. Map 10th Streams to Aptitude Categories
INSERT INTO category_degree_map (aptitude_category_id, degree_id, weight_score) VALUES
((SELECT id FROM aptitude_categories WHERE name = 'Logical' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Science Stream (PCM)' LIMIT 1), 90),
((SELECT id FROM aptitude_categories WHERE name = 'Logical' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Arts / Humanities' LIMIT 1), 70),
((SELECT id FROM aptitude_categories WHERE name = 'Technical' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Science Stream (PCM)' LIMIT 1), 95),
((SELECT id FROM aptitude_categories WHERE name = 'Technical' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Diploma in Engineering' LIMIT 1), 85),
((SELECT id FROM aptitude_categories WHERE name = 'Quantitative' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Commerce Stream' LIMIT 1), 90),
((SELECT id FROM aptitude_categories WHERE name = 'Verbal' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Arts / Humanities' LIMIT 1), 85);

-- 6. Map Graduate Degrees to Aptitude Categories
INSERT INTO category_degree_map (aptitude_category_id, degree_id, weight_score) VALUES
((SELECT id FROM aptitude_categories WHERE name = 'Logical' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Master of Business Administration (MBA)' LIMIT 1), 85),
((SELECT id FROM aptitude_categories WHERE name = 'Quantitative' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Master of Business Administration (MBA)' LIMIT 1), 80),
((SELECT id FROM aptitude_categories WHERE name = 'Technical' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Master of Technology (M.Tech)' LIMIT 1), 90),
((SELECT id FROM aptitude_categories WHERE name = 'Technical' LIMIT 1), (SELECT id FROM degrees WHERE name = 'Data Science Certification/PG' LIMIT 1), 95),
((SELECT id FROM aptitude_categories WHERE name = 'Verbal' LIMIT 1), (SELECT id FROM degrees WHERE name = 'UPSC / Civil Services Prep' LIMIT 1), 95);

SELECT 'Phase 6 DB Mapping Seeding Successful!' AS Status;
