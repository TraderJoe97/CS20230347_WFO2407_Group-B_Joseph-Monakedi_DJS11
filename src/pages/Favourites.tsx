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

type SortOption = "a-z" | "z-a" | "newest-oldest" | "oldest-newest";

export default function Favourites() {
  const [podcasts, sortBy] = useOutletContext<[PodcastPreview[],SortOption]>();
  const favourites = useSelector((state: RootState) => state.favourites);
  const dispatch = useDispatch();
  if (favourites.episodes.length === 0) {
    return (
    <>No favourites</>
    )
  }
  const favShowIds = [
    ...new Set(favourites.episodes.map((episode) => episode.showId)),
  ];
  const favShows = favShowIds.map((showId) => {
    const show = podcasts.find((podcast) => podcast.id === showId);
    return show ? show : null;
  }).filter(Boolean);


  const sortedFavShows= [...favShows].sort((a, b) => {
    if (a && b){
        switch (sortBy) {
        case "a-z":
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        case "z-a":
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
        case "newest-oldest":
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
        case "oldest-newest":
          return new Date(a.updated).getTime() - new Date(b.updated).getTime();
        default:
          return 0;
      }} else {
        return 0;
      }
  });


  return (
    <>
      <h1 className="text-xl font-extrabold ">Favourites</h1>
      <div className="flex flex-col gap-5">
        {sortedFavShows.filter(Boolean).map((show) => {
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
                        <Card
                          key={seasonId}
                          className="w-full border-none px-2"
                        >
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
                                className="border-b flex flex-col md:flex-row justify-between m-2"
                              >
                                <div>
                                  <h1>{episode.title}</h1>
                                  <p>
                                    Added to Favourites:{" "}
                                    {new Date(episode.dateAdded).toLocaleString(
                                      "ZA"
                                    )}
                                  </p>
                                </div>
                                <div className="flex md:justify-end gap-2 p-2">
                                  <Button
                                    onClick={() => {
                                      dispatch(
                                        setCurrentEpisode({
                                          id: episode.id,
                                          title: episode.title,
                                          file: episode.file,
                                          showId: episode.showId,
                                          showTitle: show.title,
                                          seasonId: episode.seasonId,
                                          seasonImage: episode.seasonImage,
                                        })
                                      );
                                    }}
                                  >
                                    Play
                                  </Button>
                                  <Button
                                    variant={"destructive"}
                                    onClick={() =>
                                      dispatch(
                                        removeFavourite({
                                          id: episode.id,
                                          showId: episode.showId,
                                          seasonId: episode.seasonId,
                                          title: "",
                                          file: "",
                                          seasonImage: "",
                                          dateAdded: 0,
                                        })
                                      )
                                    }
                                  >
                                    Remove
                                  </Button>
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
    </>
  );
}
