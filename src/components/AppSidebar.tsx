import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { HouseIcon, HeartIcon } from "lucide-react";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          <NavLink to="/" className="block py-2 hover:underline">
            <SidebarMenuButton>
              <HouseIcon />
              Podcasts
            </SidebarMenuButton>
          </NavLink>
          <NavLink to="favourites" className="block py-2 hover:underline">
            <SidebarMenuButton>
              <HeartIcon />
              Favourites
            </SidebarMenuButton>
          </NavLink>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
