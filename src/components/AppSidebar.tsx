import { NavLink } from "react-router-dom"
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"
import { HouseIcon, HeartIcon } from "lucide-react"

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          <SidebarMenuButton>
            <HouseIcon />
            <NavLink to="/" className="block py-2 hover:underline">
              Podcasts
            </NavLink>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <HeartIcon />
            <NavLink to="/" className="block py-2 hover:underline">
              Favourites
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

