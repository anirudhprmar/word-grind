"use client"
import * as React from "react"

import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { CheckCheck, LayoutIcon, MessageCircle, SquareLibrary } from "lucide-react"
import { NavSecondary } from "./nav-secondary"
import { IconSettings} from "@tabler/icons-react"


type AppSidebarProps =  React.ComponentProps<typeof Sidebar>

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutIcon,
    },
    {
      title: "Collection",
      url: "/dashboard/collection",
      icon: SquareLibrary,
    },
    {
      title: "Quiz",
      url: "/dashboard/quiz",
      icon: CheckCheck,
    },
    {
      title: "Conversation",
      url: "/dashboard/conversation",
      icon: MessageCircle,
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    }
  ],

}



export function AppSidebar({ subscriptionStatus,username,email,avatar,...props }:AppSidebarProps & { subscriptionStatus:"none" | "active" | "canceled" | "expired" |  null,username:string,email:string,avatar:string }) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <span className="text-base font-semibold">WordGrind</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}  />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{name:username ?? "",email:email ?? "",avatar:avatar ?? ""} } subscriptionStatus={subscriptionStatus}  />
      </SidebarFooter>
    </Sidebar>
  )
}
