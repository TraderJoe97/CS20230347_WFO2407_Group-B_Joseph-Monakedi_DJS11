import { RootState } from "@/store/store";
// import { removeFavourite, ClearAllFavourates } from "@/store/FavouritesSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { setCurrentEpisode } from "../store/playerSlice";
import { removeFavourite } from "@/store/FavouritesSlice";

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
  const favShowIds = [
    ...new Set(favourites.episodes.map((episode) => episode.showId)),
  ];
  const podcasts = useOutletContext<PodcastPreview[]>();
  const favShows = favShowIds.map((showId) => {
    const show = podcasts.find((podcast) => podcast.id === showId);
    return show ? show : null;
  });

  favShows.sort((a: PodcastPreview | null, b: PodcastPreview | null) => {
    if (a === null) return 1;
    if (b === null) return -1;
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5">
      {favShows.filter(Boolean).map((show) => {
        if (show) {
          const seasonsWithFavEpisodes = [
            ...new Set(
              favourites.episodes
                .filter((episode) => episode.showId === show.id)
                .map((episode) => episode.seasonId)
            ),
          ];
          return (
            <Card key={show.id}>
              <CardHeader>
                <CardTitle>
                  <div className="flex place-items-center gap-2 line-clamp-1">
                    <img
                      src={show.image}
                      alt={show.title}
                      className="rounded h-10 w-10"
                    />
                    {show.title}
                  </div>
                </CardTitle>
                <CardContent className="flex flex-col gap-2 p-2">
                  {seasonsWithFavEpisodes &&
                    seasonsWithFavEpisodes.map((seasonId) => (
                      <Card key={seasonId} className="w-full border-none px-2">
                        <h2 className="font-bold">Season {seasonId}</h2>
                        {favourites.episodes
                          .filter(
                            (episode) =>
                              episode.showId === show.id &&
                              episode.seasonId === seasonId
                          )
                          .map((episode) => (
                            <div
                              key={episode.id}
                              className="border-b flex flex-col justify-between m-2"
                            >
                              <span>{episode.title}</span>
                              <div className="flex md:justify-end gap-2 p-2">
                                <Button
                                  onClick={() => {
                                    dispatch(
                                      setCurrentEpisode({
                                        id: episode.id,
                                        title: episode.title,
                                        file: episode.file,
                                        showId: episode.showId,
                                        seasonId: episode.seasonId,
                                        seasonImage: episode.seasonImage,
                                      })
                                    );
                                  }}
                                >
                                  Play
                                </Button>
                                <Button variant={"destructive"}
                                  onClick={() => dispatch(removeFavourite({
                                     id: episode.id,
                                     showId: episode.showId,
                                     seasonId: episode.seasonId,
                                     title: "",
                                     file: "",
                                     seasonImage: "",
                                     dateAdded: 0,
 
                                  }))}>Remove</Button>
                              </div>
                            </div>
                          ))}
                      </Card>
                    ))}
                </CardContent>
              </CardHeader>
            </Card>
          );
        }
      })}
    </div>
  );
}
