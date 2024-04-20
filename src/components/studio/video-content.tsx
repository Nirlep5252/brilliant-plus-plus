import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import Image from "next/image";
import { Button } from "../ui/button";
import { PencilIcon, Trash2 } from "lucide-react";

export default function VideoContent(props: { courseId: string }) {
  const { data } = api.course.getCourseContent.useQuery({
    courseId: props.courseId,
  });

  return (
    <div className="h-[calc(100vh-10rem)] w-full">
      <Table>
        <TableCaption>A list of your courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[500px]">video</TableHead>
            <TableHead>index</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((video) => (
            <TableRow key={video.id}>
              <TableCell className="flex items-center justify-start gap-6">
                <Image
                  src={video.videoThumbnailUrl}
                  alt={video.name}
                  width={1000}
                  height={1000}
                  className="aspect-w-16 aspect-h-9 w-40 rounded-md"
                />
                <div className="flex flex-col justify-start">
                  <div className="title text-xl font-bold">{video.name}</div>
                  <div className="description">{video.description}</div>
                </div>
              </TableCell>
              <TableCell>{video.videoIndex}</TableCell>
              <TableCell>
                <Button size={"icon"} className="btn" variant={"ghost"}>
                  <PencilIcon />
                </Button>
                <Button size={"icon"} className="btn ml-2" variant={"ghost"}>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
