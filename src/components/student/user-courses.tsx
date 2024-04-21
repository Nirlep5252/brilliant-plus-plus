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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export function UserCourses() {
  const { data: myCourses, refetch } = api.course.getMyCourses.useQuery();
  const revoke = api.course.revokeEnrollment.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    myCourses && (
      <div className="flex flex-col gap-4 divide-y-2">
        <h1 className="p-4 text-3xl font-bold text-foreground">My Courses</h1>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {myCourses.map((course) => (
            <Card
              key={course.id}
              className="transform transition-transform duration-300 ease-in-out  hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/course/${course.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={course.thumbnail}
                      alt={course.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <CardDescription className="mt-2">
                    {course.description}
                  </CardDescription>
                </Link>
              </CardContent>
              <CardFooter className="mt-4 flex justify-between">
                <div className="flex gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      className="rounded-full bg-blue-200 px-2 py-1 text-sm text-blue-800"
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          revoke.mutate({
                            courseId: course.id,
                          });
                        }}
                      >
                        Revoke Enrollment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  );
}
