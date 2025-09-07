import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { db } from '~/server/db';
import { admin } from "better-auth/plugins"
import { magicLink } from "better-auth/plugins";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)
 
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
    plugins:[magicLink({
        sendMagicLink:async({email,url},request) =>{

         const { data, error } = await resend.emails.send({
            from: "Wordgrind <onboarding@resend.wordgrind.top>",
            to: email,
            subject: "Your Magic Sign-In Link",
            html: `Click <a href="${url}">here</a> to sign in. This link will expire within 5 min.`,
            });
        }
    }),
    admin(), 
    nextCookies()]
});