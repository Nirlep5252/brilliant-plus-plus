import { UserRole } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  setRole: protectedProcedure
    .input(z.object({ role: z.enum(["student", "creator"]) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          role: input.role === "student" ? UserRole.STUDENT : UserRole.CREATOR,
        },
      });
      return {};
    }),

  getLessonUser: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.lessonUser.findFirst({
        where: {
          lessonId: input.lessonId,
          userId: ctx.session.user.id,
        },
      });
    }),
  submitQuiz: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        answers: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const lessonUser = await ctx.db.lessonUser.findFirst({
        where: {
          lessonId: input.lessonId,
          userId: ctx.session.user.id,
        },
      });
      if (!lessonUser) {
        throw new Error("Lesson user not found");
      }
      const quiz = lessonUser.quiz;
      if (!quiz) {
        throw new Error("Quiz not found");
      }
      const questions = JSON.parse(quiz) as any;
      let correct = 0;
      for (const question in questions) {
        if (questions[question].answer === input.answers[question]) {
          correct++;
        }
      }
      await ctx.db.lessonUser.update({
        where: {
          id: lessonUser.id,
        },
        data: {
          quizScore: correct,
        },
      });
      return correct;
    }),

  getUserLeaderboard: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.lessonUser.findMany({
        where: {
          lessonId: input.lessonId,
          quizScore: {
            not: null,
          },
        },
        orderBy: {
          quizScore: "desc",
        },
        include: {
          user: true,
        },
      });
    }),

  getUserRank: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.lessonUser.findFirst({
        where: {
          lessonId: input.lessonId,
          userId: ctx.session.user.id,
          quizScore: {
            not: null,
          },
        },
        orderBy: {
          quizScore: "desc",
        },
      });
      if (!user) {
        return null;
      }
      const users = await ctx.db.lessonUser.findMany({
        where: {
          lessonId: input.lessonId,
        },
        orderBy: {
          quizScore: "desc",
        },
      });
      return users.findIndex((u) => u.id === user.id) + 1;
    }),

  getLessonUsers: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      const lessonUsers = await ctx.db.lessonUser.findMany({
        where: {
          lessonId: input.lessonId,
        },
        include: {
          user: true,
        },
      });
      return lessonUsers.map((lu) => lu.user);
    }),

    getLessonsbyUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input})=>{
      const lessonUsers = await ctx.db.lessonUser.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          lesson: true,
        },
      });
      return lessonUsers.map((lu) => lu.lesson);
    }),

    updateUserName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation( async ({ ctx, input}) =>{
      await ctx.db.user.update({
        where:{
          id: ctx.session.user.id,
        },
        data:{
          name: input.name,
        },
      })
    })

});
