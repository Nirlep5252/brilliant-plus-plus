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

export default function Page({ params }: { params: { courseId: string } }) {
  const { data: session, status: sessionStatus } = useSession();
  const { data: lessons } = api.course.getCourseContent.useQuery({
    courseId: params.courseId,
  });

  if (sessionStatus === "loading") return <div>Loading...</div>;
  if (sessionStatus === "unauthenticated" || session?.user.role !== "STUDENT")
    return <div>Access Denied</div>;
  return (
    <div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Lesson</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons ? (
            lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>
                  <div>
                    <Image
                      src={lesson.videoThumbnailUrl}
                      alt="Thumbnail"
                      width={100}
                      height={100}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>{lesson.name}</div>
                  <div>{lesson.description}</div>
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
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
