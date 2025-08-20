"use client"

import * as React from "react"
import {
  Book,
  BookOpen,
  Bot,
  CheckCheckIcon,
  LayoutIcon,
  MessageCircle,
  Settings2,
  SquareLibrary,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavProjects } from "~/components/nav-projects"
import { NavUser } from "~/components/nav-user"
import { TeamSwitcher } from "~/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"


const data = {
  teams: [
    {
      name: "WordGrind",
      plan: "Standard",
      logo:Book,
      url:'/dashboard'
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutIcon,
    },
    {
      title: "Collection",
      url: "/collection",
      icon: SquareLibrary,
    },
    {
      title: "Quiz",
      url: "quiz",
      icon: CheckCheckIcon,
    },
    {
      title: "Conversation",
      url: "conversation",
      icon: MessageCircle,
    },
  ],
  
}

interface userProps {
  userInfo:{
    name:string
  email:string
  avatar:string
  }
}

type AppSidebarProps = userProps & React.ComponentProps<typeof Sidebar>

export function AppSidebar({userInfo, ...props }:AppSidebarProps ) {
  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader>
        <TeamSwitcher teams={data.teams} /> 
        {/* show logo on collapse for right now im just hiding the name */}
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>

      <SidebarRail />
      
    </Sidebar>
  )
}
