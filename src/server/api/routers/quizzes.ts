import { quizResponse, quizzes } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure, } from '../trpc';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const quizRouter = createTRPCRouter({
    createQuiz:publicProcedure
    .input(
        z.object({
            userId:z.string(),
            wordId:z.number(),
            totalQuestion:z.number()
        })
    ).mutation(async ({input,ctx})=>{
      try {
          const newQuiz = await ctx.db.insert(quizzes).values({
              userId:input.userId,
              wordId:input.wordId,
              totalQuestions:input.totalQuestion
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
                id:z.number()
            })
        )
        .mutation(async({input,ctx})=>{
            try {
                await ctx.db.delete(quizzes).where(eq(quizzes.id,input.id))
    
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
                id:z.number(),
                result:z.enum(["success","failure","null"]),
                feedback:z.string(),
                suggestion:z.string()
            })
        )
        .mutation(async({input,ctx})=>{
            try {
                await ctx.db.update(quizzes).set({result:input.result,feedback:input.feedback,suggestion:input.suggestion}).where(eq(quizzes.id,input.id))
    
                return {
                    message:"updated quiz"
                }
            } catch (error) {
                console.log("Error in updating quiz",error)
            }
        }),

    ongoingQuizResponse:publicProcedure
        .input(
            z.object({
                quizId:z.number(),
                question:z.string(),
                choices:z.array(z.string()),
                userAnswer:z.string(),
                isCorrect:z.boolean()
            })
        )
        .mutation(async({input,ctx})=>{
            try {
                await ctx.db.insert(quizResponse).values({
                    quizId:input.quizId,
                    question:input.question,
                    choices:input.choices,
                    userAnswer:input.userAnswer,
                    isCorrect:input.isCorrect
                })

                return {
                    message:"inserted question"
                }
            } catch (error) {
                console.log("Error in ongoing quiz",error)
            }
        }),
        
    completeQuiz:publicProcedure
        .input(
            z.object({
                quizId:z.number(),
                result:z.enum(["success","failure","null"]),
            })
        )
        .query(async({input,ctx})=>{
            try {
                const result = await ctx.db.select().from(quizResponse).where(eq(quizResponse.quizId,input.quizId))

                const totalQuestions:number = result.length
                const correctAnswers:number = result.filter(q => q.isCorrect === true).length
                const totalScore:number = (correctAnswers/totalQuestions)*100
                
                if(totalScore === 100){
                    input.result = "success"
                }else{
                    input.result = "failure"
                }

                 const final = await ctx.db.update(quizzes).set({score:totalScore,result:input.result}).where(eq(quizzes.id,input.quizId)).returning() 

                 return {
                    message:"result curated",
                    result:final
                 }

            } catch (error) {
                console.log("Error in final result",error)
            }
        })
})

