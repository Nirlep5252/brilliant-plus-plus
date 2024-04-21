"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import CourseContent from "~/components/studio/course-content";
import Image from "next/image";
import { CircleX, PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import React from "react";
import { api } from "~/trpc/react";

export default function Page({ params }: { params: { courseId: string } }) {
  const {
    data: course,
    isLoading,
    isSuccess,
  } = api.course.getCourse.useQuery({
    courseId: params.courseId,
  });
  const { mutate, isPending } = api.course.updateCourse.useMutation();
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isSuccess && course && tags.length === 0) {
    const temp = tags;
    temp.push(...course.tags);
    setTags(temp);
  }

  if (!course) {
    return <>Course not found</>;
  }

  return (
    <div className="ml-72 w-full p-5">
      <Tabs defaultValue="Overview">
        <TabsList>
          <TabsTrigger value="Overview">Course Overview</TabsTrigger>
          <TabsTrigger value="Content">Course Content</TabsTrigger>
        </TabsList>
        <TabsContent value="Overview">
          <div className="h-[calc(100vh-5.5rem)] w-full rounded-lg border-2 border-border">
            <form className="flex justify-between p-4">
              <div className="flex w-96 flex-col gap-3 p-2">
                <Label className="flex flex-col gap-2">
                  <span className="ml-1">Course Details</span>
                  <Input
                    name="name"
                    placeholder="CourseName"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={course?.name}
                  />
                </Label>
                <Label className="flex flex-col gap-2">
                  <span className="ml-1">Description</span>
                  <Input
                    type="textarea"
                    name="description"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={course?.description}
                  />
                </Label>
                <Label className="flex flex-col gap-2">
                  <span className="ml-1">Tags</span>
                  {tags.map((tag, index) => {
                    return (
                      <div
                        className="flex w-fit gap-2 rounded-md bg-primary p-2 text-background"
                        key={index}
                      >
                        {tag}
                        <CircleX
                          className="h-4 w-4"
                          onClick={() => {
                            const newTags = tags.filter((t) => t !== tag);
                            setTags(newTags);
                          }}
                        />
                      </div>
                    );
                  })}
                </Label>
                <Label className="relative flex flex-col gap-2">
                  <Input
                    onChange={(e) => setTagInput(e.target.value)}
                    type="text"
                    placeholder="Enter a new tag"
                    defaultValue={tagInput}
                  />
                  <Button
                    disabled={!tagInput}
                    className="absolute right-0 top-0"
                    onClick={() => {
                      setTags([...tags, tagInput]);
                      setTagInput("");
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </Label>
              </div>
              <div className="flex flex-col gap-4">
                <Image
                  src="https://res.cloudinary.com/dp6puihqw/image/upload/v1713632615/images/wfs0mphbwr0xv0xwytdx.jpg"
                  alt="Online Learning"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
                <Input
                  onChange={(e) => {
                    setImage(e.target.files?.[0] ?? null);
                  }}
                  type="file"
                  className="w-fit"
                />
              </div>
            </form>
            <Button
              className="absolute bottom-10 right-10 w-32"
              onClick={() => {
                mutate({
                  courseId: course.id,
                  name,
                  description,
                  tags: tags,
                });
              }}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="Content">
          <div className="h-[calc(100vh-5.5rem)] w-full rounded-lg border-2 border-border">
            <CourseContent courseId={params.courseId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
