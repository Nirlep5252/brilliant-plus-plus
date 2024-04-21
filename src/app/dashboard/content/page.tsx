import { api } from "~/trpc/server";
import TopBar from "~/components/studio/topbar";
import { CourseCard } from "./course-card";

export default async function MyContent() {
  const myCourses = await api.course.getMyCourses();
  return (
    <div className="ml-72 w-full divide-y-2 p-5">
      <TopBar />
      <div className="flex flex-wrap gap-5 pt-5">
        {myCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
