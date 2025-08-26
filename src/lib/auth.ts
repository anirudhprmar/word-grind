import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { db } from '~/server/db';
import { admin } from "better-auth/plugins"

// import { magicLink } from "better-auth/plugins";
 
export const auth = betterAuth({
    emailAndPassword:{
        enabled:true
    },
    database:drizzleAdapter(db,{
        provider:"pg"
    }),
    telemetry:{enabled:false},
    socialProviders:{
        google:{
            prompt:"select_account",
            clientId:process.env.AUTH_GOOGLE_ID!,
            clientSecret:process.env.AUTH_GOOGLE_SECRET!
        }
    },
    plugins:[admin(), nextCookies()]
});