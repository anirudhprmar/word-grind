"use client"

import * as React from "react"
import {
  AudioWaveform,
  Book,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
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
  user: {
    name: "UserName",
    email: "useremail@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Collection",
      url: "/collection",
      icon: SquareTerminal,
    },
    {
      title: "Quiz",
      url: "quiz",
      icon: Bot,
    },
    {
      title: "Conversation",
      url: "conversation",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
      
    </Sidebar>
  )
}
