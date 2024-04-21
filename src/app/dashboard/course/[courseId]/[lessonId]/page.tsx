"use server";

import { db } from "~/server/db";
import { LessonQuizManager } from "./quiz-manager";
import "node_modules/video-react/dist/video-react.css";
import { VideoPlayer } from "./video-player";
import { getServerAuthSession } from "~/server/auth";

export const createTranscriptUrl = (videoUrl: string): Promise<string> => {
  const stuff: string[] = videoUrl.split("/");
  const i = stuff.findIndex((x) => x === "video");
  stuff[i] = "raw";

  const j = stuff.findIndex((x) => x.match(/^v[0-9]+$/));
  stuff[j] = `v${parseInt(stuff[j]!.substring(1)) + 1}`;

  let newUrl = stuff.join("/");
  newUrl = newUrl.replace("mp4", "transcript");

  return newUrl;
};

export async function getTranscriptData(transcriptUrl: string) {
  const data = await fetch(transcriptUrl);
  const text = await data.text();
  return JSON.parse(text);
}

export async function getTranscript(videoUrl: string): Promise<string> {
  const transcriptUrl = await createTranscriptUrl(videoUrl);
  console.log("TRANSCRIPT URL", transcriptUrl);
  const transcriptData = (await getTranscriptData(transcriptUrl)) as {
    transcript: string;
    start: number;
    end: number;
  }[];
  let finalTranscript = "";
  for (const part of transcriptData) {
    finalTranscript += part.transcript;
  }
  return finalTranscript;
}

export default async function Page({
  params,
}: {
  params: { lessonId: string; courseId: string };
}) {
  const session = await getServerAuthSession();

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
