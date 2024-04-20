"use client";

import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { addCourseContent } from "~/app/actions";
import { useState } from "react";
import VideoContent from "./video-content";
import Image from "next/image";
import { useFormStatus } from "react-dom";

function SubmitVideoButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? <Loader2Icon className="animate-spin" /> : "Upload Video"}
    </Button>
  );
}

export default function CourseContent(props: { courseId: string }) {
  const [video, setVideo] = useState<File | null>(null);
  const [img, setImg] = useState<File | null>(null);

  return (
    <div className="divide-y-2 border-border">
      <div className="flex items-center justify-between p-4 px-6">
        <h1 className="text-3xl font-bold">My Lessons</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new lesson</DialogTitle>
              <DialogDescription>
                Fill out details about your course lesson and start creating
                content.
              </DialogDescription>
            </DialogHeader>
            <form
              action={(formData) => addCourseContent(formData, props.courseId)}
              className="flex flex-col gap-4 overflow-auto p-2"
            >
              <Label className="flex flex-col gap-2">
                <div className="ml-1">Title</div>
                <Input
                  name="title"
                  type="text"
                  placeholder="Enter Video title"
                />
              </Label>
              <Label className="flex flex-col gap-2">
                <div className="ml-1">Description</div>
                <Input
                  name="description"
                  type="text"
                  placeholder="Enter Video Description"
                />
              </Label>
              <Label className="flex flex-col gap-2">
                <div className="ml-1">Upload Video</div>
                {video ? (
                  <video controls>
                    <source
                      src={
                        video
                          ? URL.createObjectURL(video)
                          : "https://www.w3schools.com/html/mov_bbb.mp4"
                      }
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <></>
                )}
                <Input
                  name="video"
                  type="file"
                  onChange={(e) => {
                    setVideo(e.target.files ? e.target.files[0] ?? null : null);
                  }}
                />
              </Label>
              <Label className="flex flex-col gap-2">
                <div className="ml-1">Upload Video Thumnbnail</div>
                {img ? (
                  <Image
                    src={img ? URL.createObjectURL(img) : ""}
                    width={200}
                    height={200}
                    alt="video thumbnail"
                  />
                ) : (
                  <></>
                )}
                <Input
                  name="thumbnail"
                  type="file"
                  onChange={(e) => {
                    setImg(e.target.files ? e.target.files[0] ?? null : null);
                  }}
                />
              </Label>
              <SubmitVideoButton />
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <VideoContent courseId={props.courseId} />
    </div>
  );
}
