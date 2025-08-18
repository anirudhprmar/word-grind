import { createTRPCRouter, protectedProcedure, } from '../trpc';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
    userInfo:protectedProcedure
        .query(async ({ctx})=>{
               
            const user = await ctx.db.query.user.findFirst({
                where:(userId,{ eq }) => eq(userId.id, ctx.session?.user.id)
            })
            return user
        }),
        

})