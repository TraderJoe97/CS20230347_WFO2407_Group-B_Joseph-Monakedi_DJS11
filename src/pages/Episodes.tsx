import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setCurrentEpisode, resetPlayer } from "../store/playerSlice";
import { NavLink } from "react-router-dom";
import { Heart } from "lucide-react";
import { RootState } from "@/store/store";
import { addFavourite, removeFavourite } from "@/store/FavouritesSlice";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  file: string;
  seasonImage: string;
  dateAdded: number;
}

interface Season {
  season: number;
  episodes: Episode[];
  image: string;
}

interface Show {
  id: number;
  title: string;
  seasons: Season[];
}

export default function Episodes() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const seasonIdNumber = seasonId ? parseInt(seasonId) : 0;
  const show = useOutletContext<Show>();
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites);
  const [currentPage, setCurrentPage] = useState(seasonIdNumber);
  const [maxItems, setMaxItems] = useState(5); // items in pagination component

  const updateMaxItems = () => {
    const width = window.innerWidth;
    if (width < 640) setMaxItems(4); // Small screens
    else if (width < 1024) setMaxItems(7); // Medium screens
    else setMaxItems(15); // Large screens
  };

  // Update maxItems dynamically on screen resize
  useEffect(() => {
    updateMaxItems(); // Initial setup
    const handleResize = () => updateMaxItems();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlay = (episode: Episode) => {
    dispatch(resetPlayer());
    dispatch(
      setCurrentEpisode({
        id: episode.episode,
        title: episode.title,
        file: episode.file,
        showId: show.id,
        seasonId: seasonIdNumber,
        seasonImage: show.seasons[seasonIdNumber - 1].image,
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
          seasonId: seasonIdNumber,
          title: "",
          file: "",
          seasonImage: "",
          dateAdded: 0,
        })
      );
    } else if (seasonId)
      dispatch(
        addFavourite({
          id: episode.episode,
          title: episode.title,
          showId: show.id,
          dateAdded: new Date().valueOf(),
          seasonId: seasonIdNumber,
          seasonImage: show.seasons[seasonIdNumber - 1].image,
          file: episode.file,
        })
      );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getVisibleSeasons = (
    currentPage: number,
    seasons: Season[],
    maxItems: number
  ): Season[] => {
    const totalSeasons = seasons.length;
    const half = Math.floor(maxItems / 2);

    let start = Math.max(0, currentPage - half - 1);
    let end = start + maxItems;

    if (end > totalSeasons) {
      end = totalSeasons;
      start = Math.max(0, end - maxItems);
    }

    return seasons.slice(start, end);
  };

  return (
    <div className="space-y-6">
      <NavLink to={`/show/${show.id}`}>
        <Button>Back to all Seasons</Button>
      </NavLink>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              to={`/show/${show.id}/season/${currentPage - 1}`}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1 ? "opacity-50 pointer-events-none" : ""
              }
            />
          </PaginationItem>
          {getVisibleSeasons(currentPage, show.seasons, maxItems).map(
            (season) => (
              <PaginationItem key={season.season}>
                <PaginationLink
                  to={`/show/${show.id}/season/${season.season}`}
                  onClick={() => handlePageChange(season.season)}
                  isActive={season.season === currentPage}
                >
                  {season.season}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {currentPage + Math.floor(5 / 2) < show.seasons.length && (
            <PaginationEllipsis />
          )}

          <PaginationItem>
            <PaginationNext
              to={`/show/${show.id}/season/${currentPage + 1}`}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage >= show.seasons.length}
              tabIndex={currentPage >= show.seasons.length ? -1 : 0}
              className={
                currentPage >= show.seasons.length
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <h2 className="text-2xl font-bold">Season {currentPage} Episodes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {show.seasons[currentPage - 1].episodes.map((episode) => (
          <Card key={episode.episode} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{episode.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4">{episode.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => handlePlay(episode)}
                aria-label={`Play episode ${episode.title}`}
              >
                Play Episode
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleToggleFavEpisode(episode)}
                aria-label={`${
                  isFavEpisode(episode) ? "Remove from" : "Add to"
                } favorites`}
                aria-pressed={isFavEpisode(episode)}
              >
                <Heart
                  className={
                    isFavEpisode(episode) ? "fill-red-500 stroke-red-500" : ""
                  }
                />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
