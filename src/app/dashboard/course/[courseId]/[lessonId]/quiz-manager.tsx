"use client";

import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function LessonQuizManager({
  props,
}: {
  props: { lessonId: string; courseId: string };
}) {
  const {
    data: lessonUser,
    isLoading,
    refetch: refetchLessonUser,
  } = api.user.getLessonUser.useQuery({
    lessonId: props.lessonId,
  });
  const { mutateAsync, isPending: isQuizBeingCreated } =
    api.bestFriend.generateQuiz.useMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {lessonUser?.quiz ? (
        typeof lessonUser.quizScore === "number" ? (
          <div>
            You have already attempted this quiz. Your score is{" "}
            {lessonUser.quizScore}
          </div>
        ) : (
          <>
            <div>You have successfully generated an AI quiz.</div>
            <Link
              href={`/dashboard/course/${props.courseId}/${props.lessonId}/quiz/`}
            >
              <Button>Attempt Quiz</Button>
            </Link>
          </>
        )
      ) : (
        <Button
          disabled={isQuizBeingCreated}
          onClick={async () => {
            await mutateAsync({
              lessonId: props.lessonId,
              courseId: props.courseId,
            });
            await refetchLessonUser();
          }}
        >
          {isQuizBeingCreated ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Generate AI Quiz"
          )}
        </Button>
      )}
    </div>
  );
}
