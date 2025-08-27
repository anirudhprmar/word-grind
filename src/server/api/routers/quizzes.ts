import { quizzes } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure, } from '../trpc';
import { z } from 'zod';
import { eq } from 'drizzle-orm';


//- [X]- Create tRPC endpoints for generating quizzes (e.g., multiple-choice from user's vocab). Implement scoring and update progress.
//After user finishes all questions:
// Query quiz_responses for given quizId.
// Count total questions, count correct answers.
// Calculate score, update quizzes record with score and optionally totalQuestions.
// Update result (success/failure) based on your criteria (e.g., score threshold).

//separate api call / server action for generating quizzes with ai

export const quizRouter = createTRPCRouter({
    createQuiz:publicProcedure
    .input(
        z.object({
            userId:z.string(),
            wordId:z.number()
        })
    ).mutation(async ({input,ctx})=>{
      try {
          const newQuiz = await ctx.db.insert(quizzes).values({
              userId:input.userId,
              wordId:input.wordId,
          }).returning()
      return {
              message:"quiz created successfully",
              quiz:newQuiz
          }
      } catch (error) {
        console.log(error)
        throw new Error("Failed to create quiz")
      }
    }),
    listQuizzes:publicProcedure
        .input(
            z.object({
                userId:z.string()
            })
        )
        .query(async({input,ctx})=>{
            try {
                const userQuizzes = await ctx.db.select().from(quizzes).where(eq(quizzes.userId,input.userId))
    
                return userQuizzes
            } catch (error) {
                console.log("Error in list quizzes",error)
            }
        }),
    deleteQuiz:publicProcedure
        .input(
            z.object({
                quizId:z.number()
            })
        )
        .mutation(async({input,ctx})=>{
            try {
                await ctx.db.delete(quizzes).where(eq(quizzes.id,input.quizId))
    
                return {
                    message:"quiz deleted"
                }
            } catch (error) {
                console.log("Error in deleting quiz",error)
            }
        }),
    updateQuiz:publicProcedure
        .input(
            z.object({
                quizId:z.number(),
                result:z.enum(["success","failure","null"]),
                feedback:z.string(),
                suggestion:z.string()
            })
        )
        .mutation(async({input,ctx})=>{
            try {
                await ctx.db.update(quizzes).set({result:input.result,feedback:input.feedback,suggestion:input.suggestion}).where(eq(quizzes.id,input.quizId))
    
                return {
                    message:"updated quiz"
                }
            } catch (error) {
                console.log("Error in updating quiz",error)
            }
        })
})