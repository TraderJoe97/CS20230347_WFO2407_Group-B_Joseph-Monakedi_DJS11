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
import { HouseIcon, HeartIcon, HistoryIcon } from "lucide-react";

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
          <NavLink to="history" className="block py-2 hover:underline">
            <SidebarMenuButton>
              <HistoryIcon />
              History
            </SidebarMenuButton>
          </NavLink>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
