import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer"
import Sidebar from "@/components/Sidebar";

export default function Layout() {
    return (
        <>  
            <Header/>
            <div className="flex flex-1 min-h-full overflow-hidden">
                <Sidebar/>
                <main className="flex-1 p-5">
                    <Outlet />
                </main>
            </div>
            <AudioPlayer/>
        </>
    );
}
