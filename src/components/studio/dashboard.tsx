"use client";

import { api } from "~/trpc/react";
import { StudioCourseCard } from "./studio-course-card";

export function StudioDashboard() {
  const { data: courses } = api.course.getMyCourses.useQuery();

  return (
    <div className="ml-[300px]">
      <h1 className="mb-6 text-3xl font-bold">My courses</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {courses ? (
          courses.map((course, index) => (
            <StudioCourseCard key={index} course={course} />
          ))
        ) : (
          <div>No courses found</div>
        )}
      </div>
    </div>
  );
}
