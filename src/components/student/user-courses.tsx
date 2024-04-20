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
      <div className="flex flex-col gap-4">
        <h1>My Courses</h1>
        <div className="flex flex-row gap-4">
          {myCourses.map((course) => (
            <Link href={`/dashboard/course/${course.id}`} key={course.id}>
              <Card className="h-50 w-40">
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
                    />
                    <CardDescription>{course.description}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter>
                  {course.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
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
