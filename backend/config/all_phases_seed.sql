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
USE youtube_course_db;

-- Clear existing timelines just in case
TRUNCATE TABLE career_timelines;

-- Insert Timelines for Role 1: Software Engineer
INSERT INTO career_timelines (career_role_id, step_title, step_description, recommended_age) VALUES
(1, '10th Board Exams', 'Focus heavily on PCM (Physics, Chemistry, Math) to build a strong foundation for Engineering.', '15-16 years'),
(1, '11th & 12th Grade (PCM)', 'Start practicing syntax. Begin basic coding tutorials in Python or C++. Learn Data Structures.', '16-18 years'),
(1, 'Entrance Exams (JEE/State)', 'Take Engineering Entrance Exams (JEE Main/Advanced, BITSAT, State Cet) to secure admission into a top Tech Institute.', '17-19 years'),
(1, 'B.Tech in Computer Science', 'Enroll in a 4-year B.Tech CS degree. Focus on Algorithms, Web Dev, and Internships.', '18-22 years'),
(1, 'First Internship / Open Source', 'Secure a technical internship by 3rd year. Contribute to open-source GitHub projects to build a portfolio.', '20-22 years'),
(1, 'Entry-Level Software Engineer', 'Land a Junior Developer role. Focus on mastering a full tech stack (MERN, SpringBoot, etc.).', '22+ years');

-- Insert Timelines for Role 2: Data Scientist
INSERT INTO career_timelines (career_role_id, step_title, step_description, recommended_age) VALUES
(2, '10th Board Exams', 'Perform well in Math and Sciences. Strong analytical skills are required.', '15-16 years'),
(2, '11th & 12th Grade', 'Take Science (PCM) or Commerce with Mathematics. Math and Statistics are crucial.', '16-18 years'),
(2, 'Bachelor Degree', 'Enroll in B.Tech (CS/IT), BSc Mathematics, or BSc Statistics. Learn Python, R, and SQL.', '18-21 years'),
(2, 'Build Projects & Kaggle', 'Compete on Kaggle. Build predictive models and data visualization dashboards as portfolio pieces.', '20-22 years'),
(2, 'Master Degree / Certifications (Optional)', 'Consider an MS in Data Science or complete professional certifications (AWS/Google Data Analytics).', '22-24 years'),
(2, 'Junior Data Analyst/Scientist', 'Start as a Data Analyst or Jr Data Scientist. Focus on Business Intelligence and Machine Learning deployment.', '24+ years');

-- Insert Timelines for Role 3: Marketing Manager
INSERT INTO career_timelines (career_role_id, step_title, step_description, recommended_age) VALUES
(3, '10th Board Exams', 'Focus on language, communication, and social sciences.', '15-16 years'),
(3, '11th & 12th Grade (Commerce/Arts)', 'Select Commerce or Humanities. Participate in debate, writing, and organizing school events.', '16-18 years'),
(3, 'Bachelor Degree (BBA/BCom/BA)', 'Enroll in a Bachelor of Business Administration or Mass Communication. Learn digital marketing basics (SEO, Ads).', '18-21 years'),
(3, 'Digital Marketing Internships', 'Get hands-on experience running social media campaigns or content writing for startups.', '19-21 years'),
(3, 'MBA in Marketing (Crucial)', 'Prepare for CAT/GMAT and pursue a Master of Business Administration specializing in Marketing.', '22-24 years'),
(3, 'Marketing Executive to Manager', 'Start as an Executive or Associate. Build campaigns, analyze ROI, and naturally progress to Manager within 3-5 years.', '24-28 years');

-- Insert Timelines for Role 4: Mechanical Engineer
INSERT INTO career_timelines (career_role_id, step_title, step_description, recommended_age) VALUES
(4, '10th Board Exams', 'Focus heavily on Physics and Math.', '15-16 years'),
(4, '11th & 12th Grade (PCM)', 'Science Stream (PCM) is mandatory. Develop an interest in mechanics and thermodynamics.', '16-18 years'),
(4, 'Engineering Entrance Exams', 'Clear JEE Main/Advanced or State-level Engineering exams.', '17-19 years'),
(4, 'B.Tech in Mechanical Engineering', 'Enroll in a 4-year degree. Master CAD software (AutoCAD, SolidWorks) and core principles.', '18-22 years'),
(4, 'Industrial Training & GATE', 'Complete mandatory industrial training. Prepare for GATE if aiming for Public Sector (PSUs) or M.Tech.', '21-23 years'),
(4, 'Core Engineering Role', 'Join manufacturing, automotive, or aerospace sectors as a Graduate Engineer Trainee (GET).', '22+ years');

-- Insert Timelines for Role 5: Content Strategist
INSERT INTO career_timelines (career_role_id, step_title, step_description, recommended_age) VALUES
(5, '10th Board Exams', 'Develop strong reading and writing habits. Excel in languages.', '15-16 years'),
(5, '11th & 12th Grade (Humanities/Arts)', 'Choose Humanities. Take subjects like English Literature, Psychology, or Sociology.', '16-18 years'),
(5, 'Bachelor of Arts (English/Journalism)', 'Pursue a BA in English, Journalism, or Mass Communication. Start a personal blog or write for the college magazine.', '18-21 years'),
(5, 'Freelance Writing & SEO Basics', 'Take on freelance writing gigs. Learn Search Engine Optimization (SEO) to make content discoverable.', '20-22 years'),
(5, 'Content Writer / Copywriter', 'Secure an entry-level role creating articles, social media copy, and whitepapers.', '21-23 years'),
(5, 'Content Strategist', 'Transition from writing to strategy: planning content calendars, analyzing audience engagement, and leading editorial teams.', '24+ years');

SELECT 'Career Timelines Seeded Successfully!' AS Status;
USE youtube_course_db;

-- 1. Insert New Categories
INSERT INTO aptitude_categories (id, name, description) VALUES
(5, 'Interests', 'Evaluates personal passions, hobbies, and activities the user naturally gravitates towards.'),
(6, 'Personality', 'Assesses behavioral traits, introversion vs. extroversion, leadership, and stress management.')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Insert Questions & Options

-- ================= INTERESTS =================
-- Question 25
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (25, 5, 'If you had a free weekend with no obligations, what would you most likely do?', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(25, 'Read a book or write a story.', TRUE), -- Leaning towards Content/Arts
(25, 'Fix a broken gadget or build something new.', FALSE), -- Leaning towards mechanical/tech
(25, 'Organize an event or meet up with a large group of friends.', FALSE), -- Leaning towards Management
(25, 'Analyze some data or solve a complex puzzle.', FALSE); -- Leaning towards Data/Logic
-- Note: In a true aptitude test, 'is_correct' for personality/interests isn't about 'right/wrong', but our current backend logic scores based on 'is_correct' = TRUE grouping. We assign 'TRUE' to one option merely to map points to the 'Interests' category pool for the sake of the existing technical architecture.

-- Question 26
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (26, 5, 'Which TV show or documentary topic sounds the most appealing to you?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(26, 'How the universe works (Science/Physics)', FALSE), 
(26, 'Inside the minds of billionaires (Business/Finance)', FALSE), 
(26, 'The history of ancient civilizations (Humanities/Arts)', TRUE), 
(26, 'How everyday machines are manufactured (Engineering)', FALSE);

-- Question 27
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (27, 5, 'When working on a group project, which part do you volunteer for first?', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(27, 'Doing the research and finding the facts.', FALSE), 
(27, 'Creating the presentation design and writing the script.', TRUE), 
(27, 'Leading the group and assigning tasks.', FALSE), 
(27, 'Crunching the numbers and formatting the final data.', FALSE);


-- ================= PERSONALITY =================
-- Question 28
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (28, 6, 'You are faced with a sudden, unexpected problem. How do you react?', 'hard');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(28, 'I panic momentarily, then ask someone for help.', FALSE), 
(28, 'I immediately take charge and assign people to fix it.', TRUE), 
(28, 'I sit back and analyze all possible solutions before acting.', FALSE), 
(28, 'I try a random solution and see if it works.', FALSE);

-- Question 29
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (29, 6, 'How do you prefer to work?', 'easy');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(29, 'Completely alone in a quiet space.', FALSE), 
(29, 'In a bustling, highly collaborative team environment.', TRUE), 
(29, 'Alone, but checking in with a team occasionally.', FALSE), 
(29, 'One-on-one with a trusted partner.', FALSE);

-- Question 30
INSERT INTO questions (id, category_id, question_text, difficulty) VALUES (30, 6, 'When a friend tells you about an issue they are having, you usually:', 'medium');
INSERT INTO options (question_id, option_text, is_correct) VALUES 
(30, 'Immediately offer them a logical 3-step solution to fix it.', FALSE), 
(30, 'Listen to them vent and offer emotional support without trying to "fix" it.', TRUE), 
(30, 'Tell them a story about when the same thing happened to you.', FALSE), 
(30, 'Change the subject to cheer them up.', FALSE);

-- 3. Map Content Strategy & Management Degrees to these traits
INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 5, 95 FROM aptitude_categories WHERE name = 'Interests';

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 5, 85 FROM aptitude_categories WHERE name = 'Personality';

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 3, 90 FROM aptitude_categories WHERE name = 'Interests'; -- BBA

INSERT IGNORE INTO category_degree_map (aptitude_category_id, degree_id, weight_score)
SELECT id, 3, 95 FROM aptitude_categories WHERE name = 'Personality'; -- BBA Leadership

SELECT 'Personality and Interests Data Seeded!' AS Status;
USE youtube_course_db;

-- 1. Safely add columns if they bypass
ALTER TABLE colleges ADD COLUMN eligibility_criteria TEXT;
ALTER TABLE colleges ADD COLUMN admission_deadline DATE;

-- 2. Update existing colleges with realistic constraints
UPDATE colleges 
SET eligibility_criteria = 'Minimum 75% aggregate in PCM (Physics, Chemistry, Mathematics) in 12th Standard boards.',
    admission_deadline = '2027-05-30'
WHERE name LIKE '%IIT%' OR name LIKE '%NIT%';

UPDATE colleges 
SET eligibility_criteria = 'Minimum 60% aggregate in 12th standard (Any Stream). Valid management entrance exam score preferred.',
    admission_deadline = '2027-04-15'
WHERE name LIKE '%IIM%' OR name LIKE '%Management%';

UPDATE colleges 
SET eligibility_criteria = 'Minimum 50% in 12th standard (Arts/Humanities stream preferred).',
    admission_deadline = '2027-06-15'
WHERE name LIKE '%Hindu%' OR name LIKE '%St. Stephen%';

UPDATE colleges 
SET eligibility_criteria = 'Minimum 55% aggregate in relevant subjects for degree application.',
    admission_deadline = '2027-07-01'
WHERE eligibility_criteria IS NULL;

SELECT 'College extensions successfully added!' AS Status;
USE youtube_course_db;

-- 1. Add category type to notifications table
ALTER TABLE notifications ADD COLUMN type ENUM('ADMISSION', 'SCHOLARSHIP', 'COUNSELING', 'GENERAL') DEFAULT 'GENERAL';

-- 2. Clean existing mock data (if any) or seed new categories for testing
-- Here we'll just insert a few mock notifications of distinct types for user ID 1 (or all users) so the UI has visual data.
-- First, find a valid user ID (fallback to 1 if none exist)
SET @testUser = (SELECT id FROM users LIMIT 1);
SET @testUser = IFNULL(@testUser, 1);

INSERT INTO notifications (user_id, message, is_read, type) VALUES
(@testUser, 'JEE Advanced Registration window closes in 5 days!', FALSE, 'ADMISSION'),
(@testUser, 'Your State Merit Scholarship application has been approved. Pending disbursement.', FALSE, 'SCHOLARSHIP'),
(@testUser, 'Phase 1 Counseling begins tomorrow at 10 AM. Don\'t forget your documents.', FALSE, 'COUNSELING'),
(@testUser, 'TCS Off-Campus Drive applications are now live for engineering graduates.', FALSE, 'GENERAL');

SELECT 'Notification Schema & Seed Data Updated!' AS Status;
