"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function LessonQuiz({
  params,
}: {
  params: { lessonId: string; courseId: string };
}) {
  const { mutateAsync } = api.bestFriend.generateQuiz.useMutation();
  const [quiz, setQuiz] = useState<any>();

  return (
    <div>
      <div>
        {!quiz ? (
          <Button
            onClick={async () => {
              const data = await mutateAsync({
                lessonId: params.lessonId,
                courseId: params.courseId,
              });
              setQuiz(data);
            }}
          >
            Generate Quiz
          </Button>
        ) : (
          "Start Quiz"
        )}
      </div>
      {JSON.stringify(quiz, null, 2)}
    </div>
  );
}
