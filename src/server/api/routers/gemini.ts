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

const model = gemini.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 0,
    maxOutputTokens: 8196,
  },
  safetySettings: [
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
  ],
});

const promptParts = [
  "Transcript:  You are an educator and you have just finished giving a lesson to your students. Now, you will generate MCQ questions only for your students to evaluate them based on your lecture.",
  "MCQ Questions:  ",
  "Transcript:  You will generate 25 MCQ unique questions only with the correct answer mentioned below each question.",
  "MCQ Questions:  ",
  "Transcript:  You will give the output in JSON format. It will be an array consisting of 25 objects that will have the following schema: { question: string, options: string[], answer: string }",
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
      let stuff = text.split("\n");
      stuff = stuff.splice(1, stuff.length - 3);
      const quizText = stuff.join("\n");
      console.log(quizText);

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
            quiz: quizText,
          },
        });
      } else {
        await ctx.db.lessonUser.update({
          where: {
            id: lessonUser.id,
          },
          data: {
            quiz: quizText,
          },
        });
      }
      return {
        questions: JSON.parse(quizText),
      };
    }),
});
