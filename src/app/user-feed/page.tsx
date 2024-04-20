import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import Sidebar from "~/app/user-feed/sidebar";
export default function UserFeedPage() {
  return (
    <div className="flex flex-row gap-4">
      <div className="h-full w-[15%]">
        <Sidebar />
      </div>
      <div className="h-full w-[85%]">
        <Tabs
          defaultValue="Recommended"
          className="flex h-full w-full flex-col gap-4"
        >
          <TabsList className="flex space-x-4">
            <TabsTrigger value="Recommended">Recommended</TabsTrigger>
            <TabsTrigger value="Course List">Course List</TabsTrigger>
            <TabsTrigger value="Top Courses">Top Courses</TabsTrigger>
          </TabsList>
          <TabsContent value="Recommended">
            <div>Recommended Courses</div>
          </TabsContent>
          <TabsContent value="Course List">
            <div>Course List</div>
          </TabsContent>
          <TabsContent value="Top Courses">
            <div>Top Courses</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
