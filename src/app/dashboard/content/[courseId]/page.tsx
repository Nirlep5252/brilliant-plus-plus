"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import CourseContent from "~/components/studio/course-content";
import Image from "next/image";

export default function Page({ params }: { params: { courseId: string } }) {
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
                  <Input placeholder="CourseName" />
                </Label>
                <Label className="flex flex-col gap-2">
                  <span className="ml-1">Course Description</span>
                  <Input placeholder="CourseDescription" />
                </Label>
                <Label className="flex flex-col gap-2">
                  <span className="ml-1">Tags</span>
                  <Input placeholder="Enter tags" />
                </Label>
              </div>
              <div>
                <Image
                  src="https://res.cloudinary.com/dp6puihqw/image/upload/v1713632615/images/wfs0mphbwr0xv0xwytdx.jpg"
                  alt="Online Learning"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </form>
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
