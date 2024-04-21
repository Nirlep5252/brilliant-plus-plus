"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

import Image from "next/image";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import { PlusIcon, ChevronLeft } from "lucide-react";

export default function Page({ params }: { params: { courseId: string } }) {
  const { data: session, status: sessionStatus } = useSession();
  const { data: lessons } = api.course.getCourseContent.useQuery({
    courseId: params.courseId,
  });

  if (sessionStatus === "loading") return <div>Loading...</div>;
  if (sessionStatus === "unauthenticated" || session?.user.role !== "STUDENT")
    return <div>Access Denied</div>;
  return (
    <div className="w-[calc(100vw-18rem)] divide-y-2">
      <div className="flex justify-between p-8">
        <div className="flex items-center">
          <Button variant="ghost">
            <Link href={`/dashboard`}>
              <ChevronLeft />
            </Link>
          </Button>
          <div className="flex flex-col justify-start">
            <h1 className="mb-1 text-2xl font-semibold">Course Content</h1>
            <p className="text-gray-500">
              Here you can find the lessons and resources for the course.
            </p>
          </div>
        </div>
        <div>
          <Button className="mr-20 mt-2">Start Course</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[1000px]">Lesson</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Add to watch later</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons ? (
            lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>
                  <div className="flex gap-4">
                    <Image
                      src={lesson.videoThumbnailUrl}
                      alt="Thumbnail"
                      width={100}
                      height={100}
                      className="rounded-sm"
                    />
                    <div className="flex flex-col">
                      <span className="cursor-pointer text-lg font-semibold hover:underline">
                        {lesson.name}
                      </span>
                      <span
                        className="text-sm text-gray-500"
                        style={{ maxWidth: "20rem" }}
                      >
                        {lesson.description}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Link
                      href={`/dashboard/course/${params.courseId}/${lesson.id}`}
                    >
                      <Button>View</Button>
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant={"outline"} className="flex gap-2">
                    <PlusIcon className="h-6 w-6" />
                    <span>Add to watch later</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No lessons found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
