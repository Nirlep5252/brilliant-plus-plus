import { Home, ThumbsUp, Heart, BriefcaseBusiness } from "lucide-react";
export default function Sidebar() {
  return (
    <div className="ml-4 flex flex-col gap-4">
      <div className="mr-4 mt-4 flex flex-row gap-4 rounded-md p-1 hover:border-gray-600 hover:bg-gray-300">
        <Home size={24} />
        <h1 className="text-md font-bold">Home</h1>
      </div>

      <div className="mr-4 mt-4 flex flex-row gap-4 rounded-md p-1 hover:border-gray-600 hover:bg-gray-300">
        <BriefcaseBusiness size={24} />
        <h1 className="text-md font-bold">Enrolled Courses</h1>
      </div>

      <div className="mr-4 mt-4 flex flex-row gap-4 rounded-md p-1 hover:border-gray-600 hover:bg-gray-300">
        <ThumbsUp size={24} />
        <h1 className="text-md font-bold">Liked Courses</h1>
      </div>
      <div className="mr-4 mt-4 flex flex-row gap-4 rounded-md p-1 hover:border-gray-600 hover:bg-gray-300">
        <Heart size={24} />
        <h1 className="text-md font-bold">My Wishlist</h1>
      </div>
    </div>
  );
}
