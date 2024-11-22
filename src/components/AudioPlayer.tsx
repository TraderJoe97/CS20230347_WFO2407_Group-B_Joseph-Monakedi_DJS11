// audio controls component
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play,Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react"
import { useRef, useEffect, useState} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/store/store"
import { togglePlaying, setCurrentTime } from "@/store/playerSlice"
import { formatTime } from "@/lib/helperFunctions"
import { addFavourite, removeFavourite } from "@/store/FavouritesSlice";

interface FavouriteEpisode {
  id: number;
  showId: number;
  seasonId: number;
}

export default function AudioPlayer() {
    const {currentEpisode, isPlaying, currentTime} = useSelector((state: RootState) => state.player)
    const favourites = useSelector((state: RootState) => state.favourites);
    const audioRef = useRef<HTMLAudioElement>(new Audio())
    const dispatch = useDispatch()
    const [isFavEpisode, setIsFavEpisode] = useState(false);

    useEffect(() => {
         if (currentEpisode ) {
        const isFav = favourites.episodes.some(
            (fav: FavouriteEpisode) =>
            fav.id === currentEpisode.id &&
            fav.showId === currentEpisode.showId &&
            fav.seasonId === currentEpisode.seasonId
        );
        setIsFavEpisode(isFav);
        }
    }, [currentEpisode, favourites]);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentEpisode?.file || "";
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

    

    const handleToggleFavEpisode = () => {
    if (currentEpisode && isFavEpisode) {
      dispatch(
        removeFavourite({
          id: currentEpisode.id,
          showId: currentEpisode.showId,
          seasonId: currentEpisode.seasonId,
        })
      );
    } else if (currentEpisode)
      dispatch(
        addFavourite({
          id: currentEpisode.id,
          showId: currentEpisode.showId,
          seasonId: currentEpisode.seasonId,
        })
      );
    };


    return (
        <footer className=" w-full border-t p-4">
            <div className="flex flex-col justify-between items-center">
                <div className="flex justify-between items-center w-full">
                    <p>{currentEpisode?.title}</p>
                    { audioRef.current ? 
                        <p>{formatTime(audioRef.current?.currentTime)}/{formatTime(audioRef.current?.duration ? audioRef.current.duration : 0)}</p> : 
                        <p></p>}
                </div>
                <div className="flex-1 w-full mx-5">
                    <Slider 
                        defaultValue={[currentTime]}
                        max={audioRef.current ? audioRef.current.duration : 0} 
                        onValueChange={(value) => dispatch(setCurrentTime(value[0]))} 
                        onValueCommit={(value) => {
                            if (audioRef.current) {
                                audioRef.current.currentTime = value[0];
                            }
                        }}
                        step={1}
                    />
                </div>
                <div className="flex  w-full items-center gap-2 p-2">
                    <img  className="h-10 w-10" src={currentEpisode?.seasonImage} alt="SeasonImage"/>
                    <div className="flex items-center w-full gap-2">
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
                        <Button size="icon" variant="ghost" onClick={() => {audioRef.current.volume = audioRef.current.volume === 0 ? 1 : 0} }>
                            <Volume2 className="h-5 w-5" />
                        </Button>
                        <Slider
                            value={[audioRef.current? audioRef.current.volume : 0]}
                            onValueChange={(value) => {audioRef.current.volume = value[0]}}
                            step={0.1}
                            min={0}
                            max={1}
                            className="w-20"
                            />
                    </div>
                    <Button variant="ghost" onClick={handleToggleFavEpisode}>
                        <Heart
                    className={`${isFavEpisode ? "fill-red-500 stroke-red-500" : ""}`}
                  />
                    </Button>
                </div>
            </div>
            <audio ref={audioRef} onTimeUpdate={handleProgressUpdate} />
        </footer>
    )   

}