import { quizResponse, quizzes } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure, } from '../trpc';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

//list all quizes same like we did with words in /quiz
// on more a page with all the quizzes will open , routed to with a back option

export const subscriptionRouter = createTRPCRouter({

})

