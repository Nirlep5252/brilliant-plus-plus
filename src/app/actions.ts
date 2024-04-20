"use server";

import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import * as cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function createCourse(formData: FormData, tags: string[]) {
  const session = await getServerAuthSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const newFormData = new FormData();
  newFormData.append("file", formData.get("thumbnail")!);
  newFormData.append("upload_preset", "image_preset");

  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const resourceType = "image";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = (await (
    await fetch(url, {
      method: "POST",
      body: newFormData,
    })
  ).json()) as { secure_url: string };

  const course = await db.course.create({
    data: {
      name: formData.get("title") as string,
      description: formData.get("description") as string,
      thumbnail: response.secure_url,
      tags,
      creator: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });
  return course;
}

export async function addCourseContent(formData: FormData, courseId: string) {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const newFormData = new FormData();
  newFormData.append("file", formData.get("video")!);
  newFormData.append("upload_preset", "videos_preset");

  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  let resourceType = "video";
  let url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: newFormData,
  });

  const json = (await response.json()) as { secure_url: string };

  newFormData.delete("file");
  newFormData.append("file", formData.get("thumbnail")!);
  newFormData.delete("upload_preset");
  newFormData.append("upload_preset", "image_preset");

  resourceType = "image";
  url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const thumbRes = await fetch(url, {
    method: "POST",
    body: newFormData,
  });

  const thumbJson = (await thumbRes.json()) as { secure_url: string };

  const videosOfCourse = await db.lesson.findMany({
    where: {
      courseId,
    },
  });

  const lesson = await db.lesson.create({
    data: {
      name: formData.get("title") as string,
      videoThumbnailUrl: thumbJson.secure_url,
      videoUrl: json.secure_url,
      description: formData.get("description") as string,
      videoIndex: videosOfCourse.length,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  });
  return lesson;
}
