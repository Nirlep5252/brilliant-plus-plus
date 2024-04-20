import { UserRole } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCourseList: publicProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.course.findMany();
    return courses;
  }),
  enrollCourse: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== UserRole.STUDENT) {
        throw new Error("Only students can enroll in courses");
      }
      const course = await ctx.db.course.findFirst({
        where: {
          id: input.courseId,
        },
      });
      if (!course) {
        throw new Error("Course not found");
      }
      const courseUser = await ctx.db.courseUser.findFirst({
        where: {
          courseId: input.courseId,
          userId: ctx.session.user.id,
        },
      });
      if (courseUser) {
        throw new Error("Already enrolled");
      }
      await ctx.db.courseUser.create({
        data: {
          courseId: input.courseId,
          userId: ctx.session.user.id,
        },
      });
      return {};
    }),
  getMyCourses: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role === UserRole.STUDENT) {
      const courses = await ctx.db.courseUser.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          course: true,
        },
      });
      return courses.map((cu) => cu.course);
    }
    if (ctx.session.user.role === UserRole.CREATOR) {
      const courses = await ctx.db.course.findMany({
        where: {
          creatorId: ctx.session.user.id,
        },
      });
      return courses;
    }
    return [];
  }),
});
