"use client";

import { type Course } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export const StudioCourseCard = ({ course }: { course: Course }) => {
  const { data: enrolledUsers } = api.course.getEnrolledUsers.useQuery({
    courseId: course.id,
  });

  const { data: lessons } = api.course.getLessons.useQuery({
    courseId: course.id,
  });

  return (
    <Link
      key={course.id}
      href={`/dashboard/studio/courses/${course.id}`}
      passHref
    >
      <div className="cursor-pointer">
        <Card className="transform overflow-hidden rounded-lg transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative h-48">
            <Image
              src={course.thumbnail}
              alt={course.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <CardHeader className="px-4 py-2">{course.name}</CardHeader>
          <CardContent className="px-4 py-2">
            <p className="text-gray-700">{course.description}</p>
            <p className="mt-2 text-gray-600">
              No. of Lessons: {lessons?.length}
            </p>
            <p className="mt-2 text-gray-600">
              Enrolled Users: {enrolledUsers?.length}
            </p>
          </CardContent>
          <div className="flex justify-center pt-4">
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
              Analysis
            </button>
          </div>
        </Card>
      </div>
    </Link>
  );
};
