"use client";

import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { createCourse } from "../actions";

export default function Studio() {
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");

  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  return (
    <div className="h-screen w-full divide-y-2">
      <div className="flex h-28 items-center justify-between px-10">
        <h1 className="text-3xl font-bold">Studio</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new course</DialogTitle>
              <DialogDescription>
                Fill out details about your course and start creating content.
              </DialogDescription>
            </DialogHeader>
            <form
              action={(formData) => createCourse(formData, tags)}
              className="flex flex-col gap-4 overflow-auto p-2"
            >
              <Label className="flex flex-col gap-2">
                <div className="ml-1">Title</div>
                <Input
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Cooking tutorial"
                />
              </Label>
              <Label className="flex flex-col gap-2">
                <div className="ml-1">Description</div>
                <Input
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Veg chicken with butter..."
                />
              </Label>
              <div className="flex flex-col justify-center gap-2">
                <Image
                  src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                  alt="Course image"
                  width={32}
                  height={32}
                  className={`${thumbnail ? "aspect-w-4 aspect-h-5 w-full" : ""}`}
                />
                <Input
                  name="thumbnail"
                  type="file"
                  onChange={(e) =>
                    setThumbnail(
                      e.target.files ? e.target.files[0] ?? null : null,
                    )
                  }
                />
              </div>
              <Label className="relative flex flex-col gap-2">
                <div className="ml-1">Tags</div>
                <Input
                  onChange={(e) => setTagInput(e.target.value)}
                  type="text"
                  placeholder="Enter a new tag"
                  value={tagInput}
                />
                <Button
                  disabled={!tagInput}
                  className="absolute right-0 top-[21px]"
                  onClick={() => {
                    setTags([...tags, tagInput]);
                    setTagInput("");
                  }}
                >
                  <PlusIcon />
                </Button>
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((tag, index) => {
                    return (
                      <div key={index}>
                        <Badge>
                          {tag}{" "}
                          <XIcon
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => {
                              setTags(tags.filter((_, i) => i !== index));
                            }}
                          />
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </Label>
              <Button
                type="submit"
                // disabled={isPending}
                // onClick={async () => {
                //   if (
                //     !thumbnail ||
                //     !title ||
                //     !description ||
                //     tags.length === 0
                //   ) {
                //     return;
                //   }
                //   mutate({
                //     title,
                //     description,
                //     thumbnail: await thumbnail?.text(),
                //     tags,
                //   });
                // }}
              >
                {/* {isPending && !isError ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Create Course"
                )} */}
                Create Course
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-[calc(100vh-10rem)]"></div>
    </div>
  );
}
