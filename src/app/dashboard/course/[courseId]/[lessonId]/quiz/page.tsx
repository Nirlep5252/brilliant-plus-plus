"use client";

import { Loader2Icon, MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";
import { Leaderboard } from "~/components/student/leaderboard";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { api } from "~/trpc/react";

export default function AttemptQuiz({
  params,
}: {
  params: {
    lessonId: string;
    courseId: string;
  };
}) {
  const { data: lessonUser, isLoading } = api.user.getLessonUser.useQuery({
    lessonId: params.lessonId,
  });
  const { data: userRank } = api.user.getUserRank.useQuery({
    lessonId: params.lessonId,
  });
  const { data: leaderboard } = api.user.getUserLeaderboard.useQuery({
    lessonId: params.lessonId,
  });
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { mutateAsync: submitQuiz, isPending: isSubmittingQuiz } =
    api.user.submitQuiz.useMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!lessonUser?.quiz) {
    return <div>Quiz not found</div>;
  }
  if (typeof lessonUser.quizScore === "number") {
    console.log(leaderboard);
    return (
      <div className="flex h-screen w-[calc(100vw-18rem)] items-center justify-center">
        <Leaderboard userRank={userRank} lessonUser={lessonUser} />
      </div>
    );
  }

  interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  const questions = JSON.parse(lessonUser.quiz) as Question[];

  return (
    <div className="relative flex h-screen w-[calc(100vw-288px)] flex-col items-center justify-center gap-20 pb-52">
      <div className="mb-10 text-4xl font-bold text-primary">Quiz</div>
      <div className="mcq flex flex-col gap-4">
        <div className="question text-3xl font-bold">
          <Label className="mr-10 text-3xl font-bold">
            Question {currentQuestion + 1}
          </Label>
          {questions[currentQuestion].question}
        </div>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => {
            return (
              <div
                key={option}
                className={`flex cursor-pointer items-center justify-start rounded-lg p-2 px-4 ${answers[currentQuestion] === option ? "border border-primary" : "border border-transparent"}`}
                onClick={() => {
                  setAnswers({ ...answers, [currentQuestion]: option });
                }}
              >
                {["A", "B", "C", "D"][index]}. {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="controls absolute bottom-40 flex items-center justify-center gap-10">
        <Button
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          <MoveLeft />
        </Button>
        <div>
          {currentQuestion + 1} / {questions.length}
        </div>
        <Button
          disabled={currentQuestion === questions.length - 1}
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
          <MoveRight />
        </Button>
        <Button
          disabled={isSubmittingQuiz}
          onClick={async () => {
            await submitQuiz({
              lessonId: params.lessonId,
              answers: new Array(25).map((_, i) => answers[i] || ""),
            });
          }}
        >
          {isSubmittingQuiz ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Submit Quiz"
          )}
        </Button>
      </div>
    </div>
  );
}
