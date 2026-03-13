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
