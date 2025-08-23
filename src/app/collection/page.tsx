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

import { columns, type Payment } from "../_wordsCollection/columns"
import { DataTable } from "../_wordsCollection/data-table"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "~/lib/auth"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}


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
    const userId = session.user.id

  const data = await getData()
  

  return (
    <SidebarProvider>

      <AppSidebar userInfo={{name:username,email,avatar}} />

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
                    collection
                  </BreadcrumbLink>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

       
   <div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center ">
        {/* rendered table will come here */}
         <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} userId={userId} />
        </div>
        </div>
      </SidebarInset>

    </SidebarProvider>
  )
}
