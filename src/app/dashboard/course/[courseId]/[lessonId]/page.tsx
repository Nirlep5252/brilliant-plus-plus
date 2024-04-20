"use server";

import { db } from "~/server/db";

export default async function Page({
  params,
}: {
  params: { lessonId: string; courseId: string };
}) {
  const lesson = await db.lesson.findFirst({
    where: {
      courseId: params.courseId,
      id: params.lessonId,
    },
  });
  if (!lesson) {
    return (
      <div>
        <h1>Lesson not found</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold">{lesson.name}</div>
      <div className="text-md">{lesson.description}</div>
      <video width={1080} height={720} controls preload="none">
        <source src={lesson.videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
