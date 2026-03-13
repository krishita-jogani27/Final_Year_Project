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
