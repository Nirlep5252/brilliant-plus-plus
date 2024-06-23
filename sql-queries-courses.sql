--1. Get course list 
SELECT * FROM course;

--2. Get course list for a user based on their role
IF (SELECT role FROM user WHERE id = ctx.session.user.id) = 'STUDENT' THEN
    SELECT * FROM courseUser WHERE userId = ctx.session.user.id;
ELSE IF (SELECT role FROM user WHERE id = ctx.session.user.id) = 'CREATOR' THEN
    SELECT * FROM course WHERE creatorId = ctx.session.user.id;
ELSE
    SELECT * FROM course WHERE FALSE;

--3. Delete a course 
DELETE FROM course WHERE id = input.courseId AND creatorId = ctx.session.user.id;

--4. Get course lessons based on courseId
SELECT * FROM lesson WHERE courseId = input.courseId;

--5. Get course content 
SELECT * FROM course WHERE id = input.courseId;

--6. Update course name and description
UPDATE course SET name = input.name, description = input.description, tags = input.tags WHERE id = input.courseId AND creatorId = ctx.session.user.id;

--7. Get course users based on courseId that is enrolled users in the course
SELECT * FROM courseUser WHERE courseId = input.courseId;

--8. Revoke enrollment of a user in a course
DELETE FROM courseUser WHERE courseId = input.courseId AND userId = ctx.session.user.id;

--9. Get course list based on tags
SELECT * FROM course WHERE tags LIKE '%input.tag%';

--10. Get courses based on course name 
SELECT * FROM course WHERE name = input.name;

--11. Get courses by a creator
SELECT * FROM course WHERE creatorId = input.creatorId;

--12 Get courses with particular users enrolled
SELECT * FROM courseUser WHERE courseId = input.courseId;

--13. Get courses with particular users enrolled
SELECT * FROM course LEFT JOIN courseUser ON course.id = courseUser.courseId WHERE course.id = input.courseId;

--14. Get course with particular lessons
SELECT * FROM course LEFT JOIN lesson ON course.id = lesson.courseId WHERE course.id = input.courseId;

--15. Get course with particular lessons and users enrolled
SELECT * FROM course 
LEFT JOIN courseUser ON course.id = courseUser.courseId 
LEFT JOIN lesson ON course.id = lesson.courseId 
WHERE course.id = input.courseId;

