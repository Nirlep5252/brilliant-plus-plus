"use server";

import { db } from "~/server/db";

function createTranscriptUrl(videoUrl: string) {
  console.log("ORIGINAL URL", videoUrl);
  const stuff = videoUrl.split("/");
  const i = stuff.findIndex((x) => x === "video");
  stuff[i] = "raw";

  const j = stuff.findIndex((x) => x.match(/^v[0-9]+$/));
  stuff[j] = `v${parseInt(stuff[j].substring(1)) + 1}`;

  let newUrl = stuff.join("/");
  newUrl = newUrl.replace("mp4", "transcript");

  console.log("BETTER CODE THAN PALASH", newUrl);
  return newUrl;
}

async function getTranscriptData(transcriptUrl: string) {
  const data = await fetch(transcriptUrl);
  console.log("DATA", data);
  const text = await data.text();
  console.log("TEXT", text);
  return JSON.parse(text);
}

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
  const transcriptUrl = createTranscriptUrl(lesson.videoUrl);
  const transcriptData = await getTranscriptData(transcriptUrl);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold">{lesson.name}</div>
      <div className="text-md">{lesson.description}</div>
      <video width={1080} height={720} controls preload="none">
        <source src={lesson.videoUrl} type="video/mp4" />
      </video>
      Transcript: {transcriptData[0].transcript}
    </div>
  );
}
