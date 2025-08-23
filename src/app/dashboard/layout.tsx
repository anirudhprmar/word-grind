import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AppSidebar } from "~/components/app-sidebar"

import { SiteHeader } from "~/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "~/components/ui/sidebar"
import { auth } from "~/lib/auth"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
      const session = await auth.api.getSession({
        headers:await headers()
      })
    
      if(!session) {
            redirect("/")
        }
    const username = session.user.name;
    const email = session.user.email;
    const avatar = session.user.image ?? "/default-avatar.png" 
    // const userId = session.user.id 

  return (
    <div>
        <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" userInfo={{name:username,email,avatar}}  />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
         {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  )
}

