import { words } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const wordRouter = createTRPCRouter({
    addWord:publicProcedure
        .input(
            z.object({
            userId: z.string(),
            name:z.string(),
            meaning:z.string(),
            example:z.string(),
            pronunciation:z.string(),
            synonyms:z.array(z.string()),
            learned: z.boolean().default(false)
        })
        ).mutation(async ({input,ctx})=>{
            await ctx.db.insert(words).values({
                userId:input.userId,
                name:input.name,
                meaning:input.meaning,
                example:input.example,
                pronunciation:input.pronunciation,
                synonyms:input.synonyms,
                learned:input.learned
            })
            return {
                message:"word added"
            }
        }),

    listWords:publicProcedure
    .input(
        z.object({
            userId:z.string()
        })
    )
    .query(async({input,ctx})=>{
       
        const userWords = await ctx.db.select().from(words).where(eq(words.userId,input.userId))

        return userWords
    }),

    deleteWord:publicProcedure
    .input(z.object({
        wordId:z.number()
    }))
    .mutation(async({input,ctx})=>{
        await ctx.db.delete(words).where(eq(words.id,input.wordId))
        return {
            message:"word deleted"
        }
    }),

    markLearned:publicProcedure
    .input(z.object({
    wordId:z.number()
    }))
    .mutation(async({input,ctx})=>{
        await ctx.db.update(words).set({learned:true}).where(eq(words.id,input.wordId))
        return {
            message:"marked as learned"
        }
    })
})