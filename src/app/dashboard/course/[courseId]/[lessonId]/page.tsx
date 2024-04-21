"use server";

import { db } from "~/server/db";
import { LessonQuizManager } from "./quiz-manager";
import "node_modules/video-react/dist/video-react.css";
import { VideoPlayer } from "./video-player";

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
    <div className="flex h-screen w-[calc(100vw-18rem)] flex-col items-center justify-center gap-4">
      <div className="aspect-w-16 aspect-h-9">
        <VideoPlayer lesson={lesson} />
      </div>
      <div className="flex w-full justify-between px-44">
        <div>
          <div className="text-2xl font-bold">{lesson.name}</div>
          <div className="text-md">{lesson.description}</div>
        </div>
        <div>
          <LessonQuizManager
            props={{
              lessonId: params.lessonId,
              courseId: params.courseId,
            }}
          />
        </div>
      </div>
    </div>
  );
}
