import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";


export const userRouter = createTRPCRouter({

 getUserInfo: protectedProcedure.query(async({ctx}) => {
    const user = await ctx.db.query.users.findFirst({
        where: (userId, { eq }) => eq(userId.id, ctx.session.user.id)
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}),

  me:protectedProcedure.query(async({ctx})=>{
    const user = await ctx.db.query.users.findFirst({
        where: (userId, { eq }) => eq(userId.id, ctx.session.user.id)
    })
    return user;
  })

})