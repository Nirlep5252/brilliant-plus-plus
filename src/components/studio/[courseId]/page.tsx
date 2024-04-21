"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function Page() {
  const { courseId } = useParams();
  const { data: users } = api.course.getCourseUsers.useQuery({ courseId });
  return (
    users && (
      <div>
        <h1>Course {courseId}</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    )
  );
}
