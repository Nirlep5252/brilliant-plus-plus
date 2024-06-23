import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { env } from "~/env";
import { getTranscript } from "~/app/utils";

const gemini = new GoogleGenerativeAI(env.GEMINI_API_KEY);
// const model = gemini.getGenerativeModel({
//   model: "gemini-1.5-flash-latest",
// });
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8196,
  responseMimeType: "application/json",
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = gemini.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  generationConfig,
  safetySettings,
});

const promptParts = [
  "Transcript:  You are an educator and you have just finished giving a lecture to your students. Now, you will generate MCQ questions only for your students to evaluate them based on your lecture.",
  "MCQ Questions:  ",
  "Transcript:  The output should be a JSON array of objects having properties question, options, and answer.",
  "MCQ Questions:  ",
];

export const geminiRouter = createTRPCRouter({
  generateQuiz: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const lesson = await ctx.db.lesson.findFirst({
        where: {
          id: input.lessonId,
          courseId: input.courseId,
        },
      });
      if (!lesson) {
        throw new Error("Lesson not found");
      }
      const transcript = await getTranscript(lesson.videoUrl);
      if (!transcript) return;
      console.log(transcript);
      promptParts.push(`Transcript: ${transcript}`);
      promptParts.push("MCQ Questions:  ");
      const prompt = promptParts.join("\n");
      console.log(prompt);
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      // let stuff = text.split("\n");
      // stuff = stuff.splice(1, stuff.length - 3);
      // const quizText = stuff.join("\n");
      console.log(text);

      const lessonUser = await ctx.db.lessonUser.findFirst({
        where: {
          lessonId: input.lessonId,
          userId: ctx.session.user.id,
        },
      });

      if (!lessonUser) {
        await ctx.db.lessonUser.create({
          data: {
            lessonId: input.lessonId,
            userId: ctx.session.user.id,
            quiz: text,
          },
        });
      } else {
        await ctx.db.lessonUser.update({
          where: {
            id: lessonUser.id,
          },
          data: {
            quiz: text,
          },
        });
      }
      return {
        questions: JSON.parse(text),
      };
    }),
});
