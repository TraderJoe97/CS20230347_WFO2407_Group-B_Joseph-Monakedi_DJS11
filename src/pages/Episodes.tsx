import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setCurrentEpisode, resetPlayer } from "../store/playerSlice";
import { NavLink } from "react-router-dom";
import { Heart } from "lucide-react";
import { RootState } from "@/store/store";
import { addFavourite, removeFavourite } from "@/store/FavouritesSlice";

interface Episode {
  episode: number;
  title: string;
  description: string;
  file: string;
}

interface FavouriteEpisode {
  id: number;
  showId: number;
  seasonId: number;
}

interface Season {
  season: number;
  episodes: Episode[];
  image: string;
}

interface Show {
  id: number;
  seasons: Season[];
}

export default function Episodes() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const seasonIdNumber = seasonId ? parseInt(seasonId) : 0;
  const show = useOutletContext<Show>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites);

  useEffect(() => {
    if (show && seasonId) {
      const season = show.seasons.find((s) => s.season === parseInt(seasonId));
      if (season) {
        setEpisodes(season.episodes);
      }
    }
  }, [show, seasonId]);

  const handlePlay = (episode: Episode) => {
    dispatch(resetPlayer());
    dispatch(
      setCurrentEpisode({
        id: episode.episode,
        title: episode.title,
        file: episode.file,
        showId: show.id,
        seasonId: seasonIdNumber,
        seasonImage: show.seasons[seasonIdNumber-1].image,
      })
    );
  };
  const isFavEpisode = (episode: Episode) => {
    if (seasonId && show && favourites.episodes.length > 0) {
      const isFav = favourites.episodes.some(
        (fav: FavouriteEpisode) =>
          fav.id === episode.episode &&
          fav.showId === show.id &&
          fav.seasonId === parseInt(seasonId)
      );
      return isFav;
    }
  };
  const handleToggleFavEpisode = (episode: Episode) => {
    if (isFavEpisode(episode) && seasonId) {
      dispatch(
        removeFavourite({
          id: episode.episode,
          showId: show.id,
          seasonId: parseInt(seasonId),
        })
      );
    } else if (seasonId)
      dispatch(
        addFavourite({
          id: episode.episode,
          showId: show.id,
          seasonId: parseInt(seasonId),
        })
      );
  };

  return (
    <div className="space-y-6">
      <NavLink to={`/show/${show.id}`}>
        <Button>Back to all Seasons</Button>
      </NavLink>
      <h2 className="text-2xl font-bold">Season {seasonId} Episodes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {episodes.map((episode) => (
          <Card 
            key={episode.episode}
            className="h-full flex flex-col"
          >
            <CardHeader>
              <CardTitle>{episode.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4">{episode.description}</p>
            </CardContent>
            <div className="flex self-end align-center  p-5 justify-between w-full">
                <Button onClick={() => handlePlay(episode)}>
                  Play Episode
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => handleToggleFavEpisode(episode)}
                >
                  <Heart
                    className={`${isFavEpisode(episode) ? "fill-red-500 stroke-red-500" : ""}`}
                  />
                </Button>
           
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
