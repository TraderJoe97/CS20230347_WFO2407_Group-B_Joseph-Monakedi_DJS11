import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer"
import Sidebar from "@/components/Sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen">  
            <Header/>
            <div className="flex flex-1 h-screen overflow-hidden">
                <Sidebar/>
                <ScrollArea className="flex-1 h-full p-5">
                    <Outlet />
                    <ScrollBar />
                </ScrollArea>
            </div>
            <AudioPlayer/>
        </div>
    );
}
