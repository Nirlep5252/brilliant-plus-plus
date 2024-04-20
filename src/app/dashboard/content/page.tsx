import { api } from "~/trpc/server";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { LucideMoreVertical } from "lucide-react";
import TopBar from "~/components/studio/topbar";

export default async function MyContent() {
  const myCourses = await api.course.getMyCourses();

  return (
    <div className="ml-72 w-full divide-y-2 p-5">
      <TopBar />
      <div className="flex flex-wrap gap-5 pt-5">
        {myCourses.map((course) => (
          <Card key={course.id} className="relative overflow-hidden">
            <Image
              src={course.thumbnail}
              alt={course.name}
              width={1920}
              height={1080}
              className="aspect-w-16 aspect-h-9 h-72 w-[350px] rounded-t-lg"
            />
            <CardContent className="p-5">
              <h2 className="mb-2 text-xl font-semibold">{course.name}</h2>
              <p className="mb-4 text-gray-600">{course.description}</p>
              <div className="flex items-center justify-between">
                <Link href={`/dashboard/content/${course.id}`}>
                  <Button>Edit Course</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <LucideMoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
