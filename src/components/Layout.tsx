import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import AppSidebar from "@/components/AppSidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout() {
  return (
    <div className="flex h-dvh w-dvw">
        <SidebarProvider>
      <AppSidebar />
        <div className="flex flex-col flex-1 h-full">
        <Header />
          <ScrollArea className="flex-1 h-full p-5">
            <Outlet />
            <ScrollBar />
          </ScrollArea>
        <AudioPlayer />
        </div>
    </SidebarProvider>
      </div>
  );
}
