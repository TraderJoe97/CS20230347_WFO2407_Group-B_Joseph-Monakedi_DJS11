
import { RootState } from "@/store/store";
// import { removeFavourite, ClearAllFavourates } from "@/store/FavouritesSlice";
import { useSelector } from "react-redux";
//import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useOutletContext } from "react-router-dom";

interface PodcastPreview {
  id: number;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}


export default function Favourites() {
    const favourites = useSelector((state: RootState) => state.favourites);
    const favShowIds = [...new Set(favourites.episodes.map((episode) => episode.showId))];
    const podcasts = useOutletContext<PodcastPreview[]>();
    const favShows = favShowIds.map((showId) => {
        const show = podcasts.find((podcast) => podcast.id === showId);
        return show ? show : {};
    })
    return(
    JSON.stringify(favShows)
    )
}