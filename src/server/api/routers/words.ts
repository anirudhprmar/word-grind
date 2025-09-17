import { quizResponse, quizzes, words } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { and, eq, inArray } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const wordRouter = createTRPCRouter({
    addWord:publicProcedure
        .input(
            z.object({
            userId: z.string(),
            name:z.string(),
            meaning:z.string(),
            example:z.array(z.string()),
            pronunciation:z.string(),
            synonyms:z.array(z.string()),
        })
        ).mutation(async ({input,ctx})=>{

        try {
              
              await ctx.db.insert(words).values({
                  userId:input.userId,
                  name:input.name,
                  meaning:input.meaning,
                  example:input.example,
                  synonyms:input.synonyms,
                  pronunciation:input.pronunciation,
              })
              return {
                  message:"word added"
              }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error:any) {

          const existing = await ctx.db.query.words.findFirst({
          where: (w, { eq, and }) =>
            and(eq(w.userId, input.userId), eq(w.name, input.name)),
        });

          if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `Word already exists.`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while adding word.",
        });
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

 deleteWord: publicProcedure
  .input(z.object({
    id: z.number(),
    userId: z.string()
  }))
  .mutation(async ({ input, ctx }) => {
    await ctx.db.transaction(async (tx) => {
      
      // 1. Get all quiz IDs related to word and user
      const relatedQuizzes = await tx
        .select({ id: quizzes.id })
        .from(quizzes)
        .where(and(eq(quizzes.wordId, input.id), eq(quizzes.userId, input.userId)));

      const quizIds = relatedQuizzes.map(q => q.id);

      if (quizIds.length > 0) {
        // 2. Delete all related quiz responses by quiz IDs
        await tx.delete(quizResponse).where(inArray(quizResponse.quizId,quizIds))

        // 3. Delete quizzes themselves
        await tx.delete(quizzes).where(and(
          eq(quizzes.wordId, input.id),
          eq(quizzes.userId, input.userId)
        ));
      }

      // 4. Delete the word owned by user
      await tx.delete(words).where(and(
        eq(words.id, input.id),
        eq(words.userId, input.userId)
      ));
    });

    return { message: "word deleted" };
  }),

    markLearned:publicProcedure
    .input(z.object({
    id:z.number()
    }))
    .mutation(async({input,ctx})=>{
        await ctx.db.update(words).set({learned:true}).where(eq(words.id,input.id))
        return {
            message:"marked as learned"
        }
    })
})