-- 1. Set user role to 'STUDENT' or 'CREATOR'
UPDATE user 
SET role = CASE
    WHEN input.role = 'student' THEN 'STUDENT'
    WHEN input.role = 'creator' THEN 'CREATOR'
    ELSE role
END
WHERE id = ctx.session.user.id;

-- 2. Get all courses for a user based on their role
SELECT * FROM lessonUser WHERE lessonId = input.lessonId AND userId = ctx.session.user.id;

-- 3. Get all lessons for a user based on their role
SELECT * 
FROM lessonUser 
WHERE lessonId = input.lessonId AND quizScore IS NOT NULL 
ORDER BY quizScore DESC;

-- 4. Get all lessons for a user based on their role
SELECT id 
FROM lessonUser 
WHERE lessonId = input.lessonId AND userId = ctx.session.user.id AND quizScore IS NOT NULL 
ORDER BY quizScore DESC;

-- 5. Get all lessons for a user based on their role
SELECT * FROM lessonUser WHERE lessonId = input.lessonId;

-- 6. Get all lessons for a user based on their role
SELECT * FROM lessonUser WHERE userId = input.userId;

-- 7. Get all lessons for a user based on their role
UPDATE user SET name = input.name WHERE id = ctx.session.user.id;