import Welcome from "./_components/Welcome"
import WordSearchInput from "./_components/WordSearchInput"
import { auth } from "~/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { isUserSubscribed } from "~/lib/subscription"
import Link from "next/link"
import { Button } from "~/components/ui/button"

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers:await headers()
  })

  if(!session) {
        redirect("/")
    }
const username = session.user.name
const userId = session.user.id

  const userSub = await isUserSubscribed();


  return (
   
      <div>

         {!userSub? (
                    <>
                      <div className="absolute inset-0 z-10 rounded-lg  flex items-center justify-center">
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
                      </div>
                    </>
                  ) : (
       
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center ">

          <div>
            <Welcome name={username}/>
          </div>

          <div className=" mt-10 p-2 mx-auto min-w-full lg:min-w-150">
            <WordSearchInput userId={userId }/>
          </div>

          <div className=" flex-1 rounded-xl min-h-min p-5 ">
            {/* <p className="text-left pb-2">Your Learning Streak</p> */}
            {/* <Calendar01/> */}
          </div>

        </div>
        )}
      </div>

  )
}
