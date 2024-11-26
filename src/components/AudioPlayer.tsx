// audio controls component
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
  Heart,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { togglePlaying, setCurrentTime } from "@/store/playerSlice";
import { formatTime } from "@/lib/helperFunctions";
import { addFavourite, removeFavourite } from "@/store/FavouritesSlice";
import { updateEpisodeProgress } from "@/store/EpisodesProgressSlice";
interface FavouriteEpisode {
  id: number;
  showId: number;
  seasonId: number;
  file: string;
  seasonImage: string;
  dateAdded: number;
}

export default function AudioPlayer() {
  const { currentEpisode, isPlaying, currentTime } = useSelector(
    (state: RootState) => state.player
  );
  const favourites = useSelector((state: RootState) => state.favourites);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const dispatch = useDispatch();
  const [isFavEpisode, setIsFavEpisode] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [localCurrentTime, setLocalCurrentTime] = useState(currentTime);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (currentEpisode) {
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
      audioRef.current.currentTime = currentTime
    }
  }, [currentEpisode]);



  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  },[currentEpisode,isPlaying])

  useEffect(() => {
    if (!isSeeking) {
      setLocalCurrentTime(currentTime);
    }
  }, [currentTime, isSeeking]);

  const handlePlayPause = () => {
    dispatch(togglePlaying());
  };

  const handleProgressUpdate = () => {
    if (audioRef.current && currentEpisode) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
      dispatch(
        updateEpisodeProgress({
          episodeId: currentEpisode.id,
          showId: currentEpisode.showId,
          seasonId: currentEpisode.seasonId,
          episodeProgress: audioRef.current.currentTime,
          episodeDuration: audioRef.current.duration,
          lastPlayed: Date.now().valueOf(),
          completed: audioRef.current.currentTime === audioRef.current.duration
        })
      );
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (value: number[]) => {
    setLocalCurrentTime(value[0]);
  };

  const handleSeekEnd = (value: number[]) => {
    setIsSeeking(false);
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
    dispatch(setCurrentTime(value[0]));
  };

  const handleToggleFavEpisode = () => {
    if (currentEpisode && isFavEpisode) {
      dispatch(
        removeFavourite({
          id: currentEpisode.id,
          title: "",
          showId: currentEpisode.showId,
          seasonId: currentEpisode.seasonId,
          file: "",
          seasonImage: "",
          dateAdded: 0,
        })
      );
    } else if (currentEpisode)
      dispatch(
        addFavourite({
          id: currentEpisode.id,
          title: currentEpisode.title,
          showId: currentEpisode.showId,
          seasonId: currentEpisode.seasonId,
          file: currentEpisode.file,
          seasonImage: currentEpisode.seasonImage,
          dateAdded: new Date().valueOf(),
        })
      );
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPlaying) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  return (
    <footer className="w-full flex place-items-center gap-2 px-2 border-t ">
      <img
        className="h-10 w-10 md:h-15 md:w-15 lg:h-20 lg:w-20 object-cover"
        src={currentEpisode?.seasonImage}
        alt="SeasonImage"
      />
      <div className="flex w-full flex-col justify-between items-center">
        <div className="flex justify-between items-center w-full">
          <p>{currentEpisode?.title}</p>
          {audioRef.current ? (
            <p>
              {formatTime(localCurrentTime)}/{formatTime(duration)}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="flex-1 w-full mx-5">
          <Slider
            value={[localCurrentTime]}
            max={duration}
            onValueChange={handleSeekChange}
            onValueCommit={handleSeekEnd}
            onPointerDown={handleSeekStart}
            step={1}
            aria-label="Seek"
          />
        </div>
        <div className="flex w-full items-center gap-2 p-2">
          <div className="flex items-center w-full gap-2">
            <Button variant="ghost">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="ghost" onClick={handlePlayPause}>
              {!isPlaying ? (
                <Play className="h-5 w-5" />
              ) : (
                <Pause className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                audioRef.current.muted = !audioRef.current.muted;
              }}
            >
              {!audioRef.current.muted ? <Volume2 /> : <VolumeOff />}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              step={0.1}
              min={0}
              max={1}
              className="max-w-40"
              aria-label="Volume"
            />
          </div>
          <Button variant="ghost" onClick={handleToggleFavEpisode}>
            <Heart
              className={`${isFavEpisode ? "fill-red-500 stroke-red-500" : ""}`}
            />
          </Button>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleProgressUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handlePlayPause}
      />
    </footer>
  );
}
