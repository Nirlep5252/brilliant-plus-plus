export function Leaderboard({
  userRank,
  lessonUser,
}: {
  userRank: number;
  lessonUser: {
    quizScore: number;
  };
}) {
  return (
    <div className="flex h-[600px] w-[500px] flex-col items-center justify-center rounded-lg border-2 border-border shadow-lg">
      <h1>Leaderboard</h1>
      You have already attempted this quiz. Your score is {lessonUser.quizScore}
      <div>Your rank is {userRank}</div>
    </div>
  );
}
