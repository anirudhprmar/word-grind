import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
       plugins: [
        adminClient(),
        magicLinkClient()
    ],
    baseURL:"http://localhost:3000"
})


export const { signIn, signUp, useSession } = authClient