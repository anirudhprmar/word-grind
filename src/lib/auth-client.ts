import { createAuthClient } from "better-auth/react"
// import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL:"http://localhost:3000"
})


export const { signIn, signUp, useSession } = authClient