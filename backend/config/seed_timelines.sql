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
