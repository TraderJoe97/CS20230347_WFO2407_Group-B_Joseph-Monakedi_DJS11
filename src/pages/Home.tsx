import { useState, useEffect} from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent  } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

interface PodcastPreview {
  id: number
  title: string
  description: string
  seasons: number
  image: string
  genres: number[]
  updated: string
}

const genres: { [key:string]: string} = {
    "1": "Personal Growth",
    "2": "Investigative Journalism",
    "3": "History",
    "4": "Comedy",
    "5": "Entertainment",
    "6": "Business",
    "7": "Fiction",
    "8": "News",
    "9": "Kids and Family",
}

function skeletonCard(key: number) {
    return (
        <div key={key} className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card 
            className="w-full"
            style={{
                aspectRatio: "1/1",
                minWidth: "20rem",
            }}
            >
                <CardContent className="w-full">
                    <CardHeader className="h-4/5 w-full">
                        <CardTitle className="w-full line-clamp-2">
                            <Skeleton className="h-6 w-full rounded"/>
                        </CardTitle>
                    </CardHeader>
                        <CardDescription className="w-full flex flex-col">
                            <Skeleton className="h-6 w-full"/>
                            <Skeleton className="h-6 m-1 w-1/2"/>
                            <Skeleton className="h-6 m-1 w-1/2"/>
                            <Skeleton className="h-6 m-1 w-full"/>
                            <Skeleton className="h-6  m-1 -full"/>
                            <Skeleton className="h-6 m-1 w-1/2"/>
                        </CardDescription>
                    <CardFooter className="w-full">
                        <Skeleton className="h-6 w-1/2"/> 
                        <Skeleton className=" flex flex-col h-6 w-1/2"/> 
                        <Skeleton className="h-6 w-1/2"/>        
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
        );
    }

function gridPreview(props: {podcasts: PodcastPreview[], isLoading: boolean}) {
    const { podcasts, isLoading } = props
    return (
        <div className="grid grid-cols-1 gap-2 md:gap3 lg:gap-4 md:grid-cols-2 lg:grid-cols-3">
                { isLoading ? Array.from({length: 9}).map((_,index) => skeletonCard(index)) :
                podcasts.map((podcast: PodcastPreview) => (
                    <Card className="h-full"
                    key={podcast.id} 
                    style={
                        {backgroundImage: `url(${podcast.image})`,
                        backgroundSize: "100% 100% ",
                         
                        aspectRatio: "1/1",}
                    }>  
                        <Link 
                            to={`show/${podcast.id}`}
                            className="h-full w-full flex flex-col justify-between">
                                <CardHeader className="bg-white bg-opacity-85 dark:bg-gray-950  dark:bg-opacity-85">
                                    <CardTitle className="text-left line-clamp-1">{podcast.title}</CardTitle>
                                </CardHeader>  
                            <CardContent className="h-0 bg-white bg-opacity-85 dark:bg-gray-950  dark:bg-opacity-85 opacity-0 transition-opacity duration-500 md:hover:opacity-100">
                                    {/* <CardDescription className="text-current text-left overflow-y-auto">
                                        <ScrollArea className="h-full px-1 lg:px-2">{podcast.description}<ScrollBar/></ScrollArea>
                                    </CardDescription> */}
                            </CardContent>
                                <CardFooter className="flex flex-col gap-0 bg-white bg-opacity-85 dark:bg-gray-950  dark:bg-opacity-85">
                                    <p className="w-full flex text-left">Updated: {new Date(podcast.updated).toLocaleString("en-ZA", { month: "long", day: "numeric", year: "numeric" })}</p>
                                    <p className="w-full flex text-left">Seasons: {podcast.seasons}</p>
                                    <p className="w-full flex text-left line-clamp-1">Genres: {podcast.genres.map((id) => genres[id]).join(", ")}</p>
                                </CardFooter>
                        </Link>
                    </Card>
                ))}
            </div>
    )
}

export default function PodcastPreviewList() {
    const [podcasts, setPodcasts] = useState<PodcastPreview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch("https://podcast-api.netlify.app/")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch podcasts");
                }
                return res.json();
            })
            .then((data) => setPodcasts(data.sort((a: PodcastPreview, b: PodcastPreview) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <h1>Podcast Preview List</h1>
            {gridPreview({podcasts, isLoading})}
        </>

    );
}
