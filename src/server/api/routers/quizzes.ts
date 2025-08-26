import { quizzes } from '~/server/db/schema';
import { createTRPCRouter, protectedProcedure, publicProcedure, } from '../trpc';
import { z } from 'zod';

//- [ ]- Create tRPC endpoints for generating quizzes (e.g., multiple-choice from user's vocab). Implement scoring and update progress.

//create quiz, read quizzes , delete quizzes 
//separate api call / server action for generating quizzes with ai
export const quizRouter = createTRPCRouter({
    createQuiz:publicProcedure
    .input(
        z.object({
            userId:z.string(),
            wordId:z.number()
        })
    ).mutation(async ({input,ctx})=>{
        await ctx.db.insert(quizzes).values({
            userId:input.userId,
            wordId:input.wordId,
        })
    return {
            message:"quiz created"
        }
    }),
    // getQuizzes:,
    // deleteQuiz:
})