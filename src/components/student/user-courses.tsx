"use client";

import { api } from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function UserCourses() {
  const { data: myCourses } = api.course.getMyCourses.useQuery();
  return (
    myCourses && (
      <div className="flex flex-col gap-4 divide-y-2">
        <h1 className="p-4 text-3xl font-bold text-gray-800">My Courses</h1>
        <div className="flex flex-row gap-4 p-4">
          {myCourses.map((course) => (
            <Link href={`/dashboard/course/${course.id}`} key={course.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      width={200}
                      height={200}
                      className="h-48 w-72 rounded-lg"
                    />
                    <CardDescription>{course.description}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {course.tags.map((tag) => (
                    <span
                      className="rounded-lg bg-gray-200 px-2 py-1 text-sm"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    )
  );
}
