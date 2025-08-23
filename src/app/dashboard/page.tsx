import Welcome from "../_components/Welcome"
import WordSearchInput from "../_components/WordSearchInput"
// import Calendar01 from "~/components/calendar-01"
import { auth } from "~/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth.api.getSession({
    headers:await headers()
  })

  if(!session) {
        redirect("/")
    }
const username = session.user.name
const userId = session.user.id 

  return (
   
      <div>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center ">

          <div>
            <Welcome name={username}/>
          </div>

          <div className=" mt-10 p-2 mx-auto min-w-full lg:min-w-150">
            <WordSearchInput userId={userId }/>
          </div>

          <div className=" flex-1 rounded-xl min-h-min p-5 ">
            <p className="text-left pb-2">Your Learning Streak</p>
            {/* <Calendar01/> */}
          </div>
        </div>
      </div>

  )
}
