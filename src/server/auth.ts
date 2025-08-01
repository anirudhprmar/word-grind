import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/server/db"
import { users, accounts, sessions, verificationTokens } from "~/server/db/schema";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
    
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
       async signIn({ account, profile }) {
      // Only run for Google provider
      if (account?.provider === "google" && profile?.email) {
        // Check if user already exists
        const existing = await db.query.users.findFirst({
          where: (u,{ eq }) => eq(u.email, profile.email!),
        });
        if (!existing) {
          await db.insert(users).values({
            email: String(profile.email),
            name: typeof profile.name === "string" ? profile.name : "",
          });
        }
        return true;
      }
    
      return false;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },

  }
})

