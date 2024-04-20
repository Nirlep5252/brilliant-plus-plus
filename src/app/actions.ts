"use server";

import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";

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

  console.log(response);
}
