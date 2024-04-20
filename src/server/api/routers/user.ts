import { UserRole } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
});
