"use server";

import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function createCourse(formData: FormData, tags: string[]) {
  const session = await getServerAuthSession();

  console.log("FORMDATA", formData, tags);

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
