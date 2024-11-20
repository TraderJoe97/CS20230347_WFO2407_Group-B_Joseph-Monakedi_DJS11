// audio controls component
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play,Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/store/store"
import { togglePlaying, setCurrentTime } from "@/store/playerSlice"

export default function AudioPlayer() {
    const {currentEpisode, isPlaying, currentTime} = useSelector((state: RootState) => state.player)
    const audioRef = useRef<HTMLAudioElement>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying,currentEpisode]);

    const handlePlayPause = () => {
        dispatch(togglePlaying());
    };
    
    const handleProgressUpdate = () => {
        if (audioRef.current) {
            dispatch(setCurrentTime(audioRef.current.currentTime));
        }
    }

    return (
        <footer className=" w-full border-t p-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center">
                    <Button size="icon" variant="ghost">
                        <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handlePlayPause}>
                        {!isPlaying ? <Play className="h-5 w-5" /> :
                        <Pause className="h-5 w-5" />}
                    </Button>
                    <Button size="icon" variant="ghost">
                        <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Volume2 className="h-5 w-5" />
                    </Button>
                    <div>                        
                        <div className="ml-2">
                            <h3>{currentEpisode?.title}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mx-5">
                    <Slider 
                        value={[currentTime]} 
                        max={audioRef.current ? audioRef.current.duration : 0} 
                        onValueChange={(value) => dispatch(setCurrentTime(value[0]))} 
                        step={1}
                    />
                </div>
            </div>
            <audio ref={audioRef} src={currentEpisode?.file} onTimeUpdate={handleProgressUpdate} />
        </footer>
    )   

}