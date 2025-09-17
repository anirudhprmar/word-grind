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
import { api } from "~/lib/api"



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



export function AppSidebar({ ...props }:AppSidebarProps) {
  const {data:userInfo,isLoading} = api.user.userInfo.useQuery()
    if (isLoading) return;
    const username = userInfo?.name ?? "";
    const email = userInfo?.email ?? "";
    const avatar = userInfo?.image ?? "/default-avatar.png" 

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
        <NavUser user={{name:username ?? "",email:email ?? "",avatar:avatar ?? ""}}  />
      </SidebarFooter>
    </Sidebar>
  )
}
