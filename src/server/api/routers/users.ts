import { user } from '~/server/db/schema';
import { createTRPCRouter, protectedProcedure, } from '../trpc';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const userRouter = createTRPCRouter({
    userInfo:protectedProcedure
        .query(async ({ctx})=>{
               
            const user = await ctx.db.query.user.findFirst({
                where:(userId,{ eq }) => eq(userId.id, ctx.session?.user.id)
            })
            return user
        }),
        
        updateUserName:protectedProcedure
            .input(
                z.object({
                    userId:z.string(),
                    name:z.string()
                })
            )
            .mutation(async ({input,ctx})=>{

        try {
            await ctx.db.update(user).set({name:input.name}).where(eq(user.id,input.userId)).returning()
             
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error:any) {
            
            throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong while updating user name.",
            });
      
        }
        })
})