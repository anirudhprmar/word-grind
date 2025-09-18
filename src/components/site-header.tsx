'use client'
import { usePathname } from "next/navigation"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
         <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem className="hidden md:block">
      <BreadcrumbLink href="/dashboard">
        dashboard
      </BreadcrumbLink>
    </BreadcrumbItem>

{ pathname === '/dashboard'?null:
<>
    <BreadcrumbSeparator className="hidden md:block" />
    <BreadcrumbItem>
      {/* Show 'quiz' for /dashboard/quiz or any quiz subpage */}
      {(pathname === '/dashboard/quiz' || pathname.startsWith('/dashboard/quiz/')) ? (
        <BreadcrumbPage>quiz</BreadcrumbPage>
      ) : (
        // Show other paths by removing /dashboard/ prefix
        <BreadcrumbPage>{pathname.replace('/dashboard/', '')}</BreadcrumbPage>
      )}
    </BreadcrumbItem>
      </>
    }

    {/* Conditionally render quiz ID breadcrumb if inside a specific quiz page */}
    {pathname.startsWith('/dashboard/quiz/') && (
      <>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{pathname.endsWith('feedback') ? pathname.replace('/dashboard/quiz/',"").replace('/feedback',"")  : pathname.replace('/dashboard/quiz/', '')}</BreadcrumbPage>
        </BreadcrumbItem>
      </>
    )}

    {pathname.endsWith('feedback') && (
      <>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>feedback</BreadcrumbPage>
        </BreadcrumbItem>
      </>
    )}
  </BreadcrumbList>
</Breadcrumb>

      </div>
    </header>
  )
}
