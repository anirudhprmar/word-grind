import { auth } from "~/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { isUserSubscribed } from "~/lib/subscription"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import DashboardDisplay from "./_components/DashboardDisplay"

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers:await headers()
  })

  if(!session) {
        redirect("/")
    }
const username = session.user.name
const userId = session.user.id

 const isSubscribed = await isUserSubscribed()

    if (!isSubscribed) {
        return ( <div className="absolute inset-0 z-10 rounded-lg  flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center max-w-md">
          <h3 className="text-xl font-semibold mb-2">
            Subscription Required
          </h3>
          <p className="text-muted-foreground mb-4">
            You need an active subscription to access payment management
            features.
          </p>
          <Link href="/pricing">
            <Button>Subscribe Now</Button>
          </Link>
        </div>
      </div>)
    
    }


  return <DashboardDisplay userId={userId} username={username} />
}
