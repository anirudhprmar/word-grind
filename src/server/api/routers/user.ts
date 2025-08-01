import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";


export const userRouter = createTRPCRouter({

 getUserInfo: protectedProcedure.query(async({ctx}) => {

    const user = await ctx.db.query.users.findFirst({
        where: (userId, { eq }) => eq(userId.id, ctx.session.user.id)
    });

    return user;
}),

  me:protectedProcedure.query(async({ctx})=>{
     if (!ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User ID not found" });
    }
    const user = await ctx.db.query.users.findFirst({
        where: (userId, { eq }) => eq(userId.id, ctx.session.user.id)
    })
    return user;
  })

})