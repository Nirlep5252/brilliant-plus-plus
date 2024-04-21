import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LucideMoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { api } from "~/trpc/react";
import TopBar from "~/components/student/topbar";

export function UserFeedPage() {
  const { data: allCourses, isLoading } = api.course.getCourseList.useQuery();
  const { data: enrolledCourse, refetch } = api.course.getMyCourses.useQuery();
  const { mutate } = api.course.enrollCourse.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <TopBar />
      <div className="mt-16 flex flex-wrap gap-4 p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : allCourses ? (
          allCourses.map((course) => (
            <Card key={course.id} className="relative overflow-hidden">
              <Image
                src={course.thumbnail}
                alt={course.name}
                width={1920}
                height={1080}
                className="aspect-w-16 aspect-h-9 h-72 w-96 rounded-t-lg"
              />
              <CardContent className="p-5">
                <h2 className="mb-2 text-xl font-semibold">{course.name}</h2>
                <p className="mb-4 text-gray-600">{course.description}</p>
                <div className="flex items-center justify-between">
                  {enrolledCourse?.find((c) => c.id === course.id) ? (
                    <Link href={`/dashboard/course/${course.id}`}>
                      <Button>Go to Course</Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => {
                        mutate({ courseId: course.id });
                      }}
                    >
                      Enroll Course
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <LucideMoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Add to Wishlist</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No courses available</div>
        )}
      </div>
    </div>
  );
}
