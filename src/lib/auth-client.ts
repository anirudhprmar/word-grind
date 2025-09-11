import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { magicLinkClient } from "better-auth/client/plugins";
import { polarClient } from "@polar-sh/better-auth";

import { organizationClient } from "better-auth/client/plugins";


export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
       plugins: [
        organizationClient(),
           adminClient(),
           magicLinkClient(),
           polarClient(),
        ],
})


