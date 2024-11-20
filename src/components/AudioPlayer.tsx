// audio controls component
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play,Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"


export default function AudioPlayer() {
    return (
        <footer className="absolute bottom-0 w-full border-t p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                <Button size="icon" variant="ghost">
                    <SkipBack className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                    <Play className="h-5 w-5" />
                    <Pause className="h-5 w-5 hidden" />
                </Button>
                <Button size="icon" variant="ghost">
                    <SkipForward className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                    <Volume2 className="h-5 w-5" />
                </Button>
                </div>
                <div className="flex-1 mx-5">
                    <Slider defaultValue={[0]} max={100} step={1} />
                </div>
            </div>

        </footer>
    )   

}