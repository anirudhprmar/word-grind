import { AppSidebar } from "~/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import Welcome from "../_components/Welcome"
import WordSearchInput from "../_components/WordSearchInput"
import Calendar01 from "~/components/calendar-01"
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
const username = session.user.name;
const email = session.user.email;
const avatar = session.user.image ?? "/default-avatar.png" 
// console.log(email)
// console.log(avatar)
  return (
    <SidebarProvider>

      <AppSidebar userInfo={{name:username,email,avatar}}  />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center ">

          <div>
            <Welcome name={username}/>
          </div>

          <div className=" mt-10 p-2 mx-auto min-w-full lg:min-w-200">
            <WordSearchInput/>
          </div>

          <div className=" flex-1 rounded-xl min-h-min p-5 ">
            <p className="text-left pb-2">Your Learning Streak</p>
            <Calendar01/>
          </div>
        </div>
      </SidebarInset>

    </SidebarProvider>
  )
}
