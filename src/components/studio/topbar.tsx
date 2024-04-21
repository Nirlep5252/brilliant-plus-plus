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
import { createCourse } from "~/app/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? <Loader2Icon className="animate-spin" /> : "Create Course"}
    </Button>
  );
}

export default function TopBar() {
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");

  return (
    <div className="w-full divide-y-2">
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
              <DialogTitle className="text-2xl">Add a new course</DialogTitle>
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
                  type="text"
                  placeholder="Enter title here.."
                />
              </Label>
              <Label className="flex flex-col gap-2">
                <div className="ml-1">Description</div>
                <Input
                  name="description"
                  type="text"
                  placeholder="Enter description here.."
                />
              </Label>
              <div className="flex flex-col justify-center gap-2">
                <Image
                  src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                  alt="Course image"
                  width={32}
                  height={32}
                  className={`${thumbnail ? "aspect-w-16 aspect-h-9 h-72 w-[350px]" : ""}`}
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
              <SubmitButton />
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
