import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import AppSidebar from "@/components/AppSidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 h-full overflow-hidden">
          <ScrollArea className="flex-1 h-full p-5">
            <Outlet />
            <ScrollBar />
          </ScrollArea>
        </div>
        <AudioPlayer />
      </div>
    </SidebarProvider>
  );
}
