// Header component
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-5 border-b">
            <Input
                type="search"
                placeholder="Search podcasts..."
                className="w-full max-w-wm mr-2"
            />
            <Button size="icon">
                <Search className="h-5 w-5" />
            </Button>
            <ModeToggle />
            
        </header>
    )   

}