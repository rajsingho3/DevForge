"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  FlameIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// Define the interface for a single playground item, icon is now a string
interface PlaygroundData {
  id: string
  name: string
  icon: string // Changed to string
  starred: boolean
}

// Map icon names (strings) to their corresponding LucideIcon components
const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2, // Include the default icon
  // Add any other icons you might use dynamically
}

export function DashboardSidebar({ initialPlaygroundData }: { initialPlaygroundData: PlaygroundData[] }) {
  const pathname = usePathname()
  const starredPlaygrounds = initialPlaygroundData.filter((p) => p.starred)
  const recentPlaygrounds = initialPlaygroundData

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r bg-background">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-3 justify-center">
          <Image src={"/logo.svg"} alt="DevForge" height={50} width={50} className="dark:invert" />
          <span className="font-bold text-xl group-data-[collapsible=icon]:hidden">DevForge</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Home">
                <Link href="/" className="gap-3">
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                <Link href="/dashboard" className="gap-3">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider">
            <Star className="h-4 w-4 mr-2" />
            Starred Projects
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add starred playground">
            <Plus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {starredPlaygrounds.length === 0 ? (
                <div className="px-4 py-3 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                  No starred projects
                </div>
              ) : (
                starredPlaygrounds.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                        className="gap-3"
                      >
                        <Link href={`/playground/${playground.id}`}>
                          {IconComponent && <IconComponent className="h-4 w-4" />}
                          <span className="truncate">{playground.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider">
            <History className="h-4 w-4 mr-2" />
            Recent Projects
          </SidebarGroupLabel>
          <SidebarGroupAction title="Create new playground">
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentPlaygrounds.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                  <p className="mb-2">No projects yet</p>
                  <p className="text-xs">Create your first playground</p>
                </div>
              ) : (
                <>
                  {recentPlaygrounds.slice(0, 5).map((playground) => {
                    const IconComponent = lucideIconMap[playground.icon] || Code2;
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === `/playground/${playground.id}`}
                          tooltip={playground.name}
                          className="gap-3"
                        >
                          <Link href={`/playground/${playground.id}`}>
                            {IconComponent && <IconComponent className="h-4 w-4" />}
                            <span className="truncate">{playground.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  {recentPlaygrounds.length > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="View all" className="gap-3">
                        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                          <span className="text-sm">View all projects →</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="gap-3">
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
