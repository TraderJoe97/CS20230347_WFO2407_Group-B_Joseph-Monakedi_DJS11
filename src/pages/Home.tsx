import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface PodcastPreview {
  id: number;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

const genres: { [key: string]: string } = {
  "1": "Personal Growth",
  "2": "Investigative Journalism",
  "3": "History",
  "4": "Comedy",
  "5": "Entertainment",
  "6": "Business",
  "7": "Fiction",
  "8": "News",
  "9": "Kids and Family",
};

type SortOption = "a-z" | "z-a" | "newest-oldest" | "oldest-newest";

function skeletonCard(key: number) {
  return (
    <Card
      className="w-full"
      key={key}
      style={{
        aspectRatio: "1/1",
        minWidth: "20rem",
      }}
    >
      <CardContent className="w-full">
        <CardHeader className="h-4/5 w-full">
          <CardTitle className="w-full line-clamp-2">
            <Skeleton className="h-6 w-full rounded" />
          </CardTitle>
        </CardHeader>
        <CardDescription className="w-full flex flex-col">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 m-1 w-1/2" />
          <Skeleton className="h-6 m-1 w-full" />
        </CardDescription>
        <CardFooter className="w-full">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

function gridPreview(props: {
  filteredPodcasts: PodcastPreview[];
  isLoading: boolean;
}) {
  const { filteredPodcasts, isLoading } = props;
  return (
    <div className="grid grid-cols-1 gap-2 md:gap3 lg:gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: 9 }).map((_, index) => skeletonCard(index))
        : filteredPodcasts.map((podcast: PodcastPreview) => (
            <Card
              className="h-full"
              key={podcast.id}
              style={{
                backgroundImage: `url(${podcast.image})`,
                backgroundSize: "100% 100% ",
                aspectRatio: "1/1",
              }}
            >
              <NavLink
                to={`show/${podcast.id}`}
                className="h-full w-full flex flex-col justify-between"
              >
                <CardHeader className="bg-white bg-opacity-80 dark:bg-gray-950  dark:bg-opacity-80">
                  <CardTitle className="text-left line-clamp-1">
                    {podcast.title}
                  </CardTitle>
                </CardHeader>
                <CardFooter className=" bg-white bg-opacity-85 dark:bg-gray-950  dark:bg-opacity-85">
                  <div className="text-sm">
                    <p className="place-self-start line-clamp-1">
                      {new Date(podcast.updated).toLocaleString("en-ZA", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="place-self-start line-clamp-1">
                      {podcast.seasons} Season{podcast.seasons === 1 ? "" : "s"}
                    </p>
                    <span className="place-self-start line-clamp-1">
                      {podcast.genres.map((id) => genres[id]).join(", ")}
                    </span>
                  </div>
                </CardFooter>
              </NavLink>
            </Card>
          ))}
    </div>
  );
}

export default function PodcastPreviewList() {
  const [podcasts, setPodcasts] = useState<PodcastPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const [selectedFilters, setSelectedFillters] = useState<number[]>([9])

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch podcasts");
        }
        return res.json();
      })
      .then((data) => setPodcasts(data))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedPodcasts = [...podcasts].sort((a, b) => {
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
    }
  });

  const filteredPodcasts = sortedPodcasts.filter((podcast) =>
    selectedFilters.length > 0 ? podcast.genres.some((genreId) => selectedFilters.includes(genreId)) : true)
  

  if (location.pathname === "/favourites") {
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <h1 className="">Favourites</h1>
        <Select onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="SortBy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a-z">A-Z</SelectItem>
            <SelectItem value="z-a">Z-A</SelectItem>
            <SelectItem value="newest-oldest">Newest to Oldest</SelectItem>
            <SelectItem value="oldest-newest">Oldest to Newest</SelectItem>
          </SelectContent>
        </Select>
        <Outlet context={[podcasts, sortBy]} />
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col gap-2">
        <h1>Podcast Previews</h1>
        <Select onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="SortBy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a-z">A-Z</SelectItem>
            <SelectItem value="z-a">Z-A</SelectItem>
            <SelectItem value="newest-oldest">Newest to Oldest</SelectItem>
            <SelectItem value="oldest-newest">Oldest to Newest</SelectItem>
          </SelectContent>
        </Select>
        {gridPreview({ filteredPodcasts, isLoading })}
      </div>
    );
  }
}
