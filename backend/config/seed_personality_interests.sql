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
