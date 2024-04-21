import { type LessonUser, type User } from "@prisma/client";
import Image from "next/image";

export function Leaderboard({
  leaderboard,
  lessonUser,
}: {
  leaderboard: (LessonUser & { user: User })[];
  lessonUser: LessonUser;
}) {
  return (
    <div className="flex h-[600px] w-[500px] flex-col items-center justify-between rounded-lg border-2 border-border shadow-lg">
      <h1 className="w-full border-b-2 border-border p-4 py-6 text-center text-2xl font-bold">
        Leaderboard
      </h1>
      <div className="flex h-full w-full flex-col justify-start p-6 px-10">
        {leaderboard.slice(0, 10).map((user, index) => (
          <div key={user.id} className="flex items-center justify-center">
            <Image
              src={user?.user.image ?? "/avatar.png"}
              alt="Thumbnail"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex w-full items-center justify-between border-b-2 border-border p-4">
              {index + 1}. {user.user.name}
            </div>
          </div>
        ))}
      </div>
      <span className="w-full border-t-2 border-border p-4 py-6 text-center text-lg font-bold">
        You have already attempted this quiz. Your score is{" "}
        {lessonUser.quizScore}
      </span>
      <div className="w-full pb-5 text-center text-lg font-bold">
        Your rank is{" "}
        {leaderboard.findIndex((item) => item.userId === lessonUser.userId) + 1}
      </div>
    </div>
  );
}
