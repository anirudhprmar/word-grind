/* eslint-disable @typescript-eslint/no-base-to-string */
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/server/db"
import { users, accounts, sessions, verificationTokens } from "~/server/db/schema";
// import Credentials from "next-auth/providers/credentials"



export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google
    // Credentials({
    //   credentials: {
    //     email: { label: "Email", type: "email"},
    //     name: { label: "Name", type: "text" },
    //   },
    //    async authorize(credentials) {
    //      if (!credentials?.email || !credentials?.name) {
    //       throw new Error("Invalid credentials");
    //     }
    //    const existing = await db.query.users.findFirst({
    //       where: (u,{ eq }) => eq(credentials.email),
    //     });
    //     if (!existing) {
    //       await db.insert(users).values({
    //         email: String(credentials.email),
    //         name: typeof credentials.name === "string" ? credentials.name : "",
    //       });
    //     }
    //     return true;
        
    //     if (!existingUser) {
    //       throw new Error(`User not found`);
    //     }

    //      return true
    //   },
    // }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   // Only run for Google provider
    //   if (account?.provider === "google" && profile?.email) {
    //     // Check if user already exists
    //     const existing = await db.query.users.findFirst({
    //       where: (u,{ eq }) => eq(u.email, profile.email),
    //     });
    //     if (!existing) {
    //       await db.insert(users).values({
    //         email: String(profile.email),
    //         name: typeof profile.name === "string" ? profile.name : "",
    //       });
    //     }
    //     return true;
    //   }
    //   // For credentials, you may want to handle differently
    //   if (account?.provider === "credentials") {
    //     return true;
    //   }
    //   return false;
    // },
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

