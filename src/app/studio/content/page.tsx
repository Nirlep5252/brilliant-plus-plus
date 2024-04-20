import { api } from "~/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
export default async function MyContent() {
  const myCourses = await api.course.getMyCourses();

  return (
    <div>
      <h1>My Content</h1>
      <div>
        {myCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Image
                  src={course.thumbnail}
                  alt={course.name}
                  width={1920}
                  height={1080}
                  className="h-52 w-52"
                />
                <CardDescription>{course.description}</CardDescription>
              </div>
            </CardContent>
            <CardFooter>
              <button>View</button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
