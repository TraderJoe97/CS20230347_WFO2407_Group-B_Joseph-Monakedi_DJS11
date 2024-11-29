// Header component
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {useState} from "react";
import {useNavigate} from "react-router-dom"

export default function Header() {
const [searchTerm, setSearchTerm] = useState("")
const navigate = useNavigate();

const handleSearch = () => {
  if (searchTerm.trim()) {
    navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  }
}

  return (
    <header className="flex items-center gap-2 justify-between p-5 border-b">
      <SidebarTrigger />
      <Input
        type="search"
        placeholder="Search podcasts..."
        className="w-full max-w-wm mr-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button 
      onClick={handleSearch}>
        <Search className="h-5 w-5" />
      </Button>
      <ModeToggle />
    </header>
  );
}