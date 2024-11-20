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
                        <CardTitle className="w-full">
                            <Skeleton className="h-6 w-full rounded"/>
                        </CardTitle>
                        <CardDescription className="w-full flex flex-col">
                            <Skeleton className="h-6 w-full"/>
                            <Skeleton className="h-6 m-1 w-1/2"/>
                            <Skeleton className="h-6 m-1 w-1/2"/>
                            <Skeleton className="h-6 m-1 w-full"/>
                            <Skeleton className="h-6  m-1 -full"/>
                            <Skeleton className="h-6 m-1 w-1/2"/>
                        </CardDescription>
                    </CardHeader>
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
                podcasts.map((podcast) => (
                    <Card 
                    key={podcast.id} 
                    style={
                        {backgroundImage: `url(${podcast.image})`,
                        backgroundSize: "100% 100% ",
                         
                        aspectRatio: "1/1",}
                    }>  
                        <Link 
                            to={podcast.id.toString()}
                            className="h-full w-full">
                            <CardContent className="hidden md:flex w-full top-0 inset-0 flex-col place-content-between h-full bg-white bg-opacity-85 dark:bg-gray-950  dark:bg-opacity-85 opacity-0 transition-opacity duration-500 md:hover:opacity-100">
                                <CardHeader className="h-4/5">
                                    <CardTitle className="text-left">{podcast.title}</CardTitle>
                                    <CardDescription className="text-current text-left overflow-y-auto">
                                        <ScrollArea className="h-full px-1 lg:px-2">{podcast.description}<ScrollBar/></ScrollArea>
                                    </CardDescription>
                                </CardHeader>  
                                <CardFooter className="flex flex-col content-start text-left text-sm">
                                    <p className="w-full flex text-left">Updated: {new Date(podcast.updated).toLocaleString("en-ZA", { month: "long", day: "numeric", year: "numeric" })}</p>
                                    <p className="w-full flex text-left">Seasons: {podcast.seasons}</p>
                                    <p className="w-full flex text-left">Genres: {podcast.genres.map((id) => genres[id]).join(", ")}</p>
                                </CardFooter>
                            </CardContent>
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
        <ScrollArea className="h-full px2 md:px-3 lg:px-5">
            <h1>Podcast Preview List</h1>
            {gridPreview({podcasts, isLoading})}
            <ScrollBar orientation="vertical"/>
        </ScrollArea>
    );
}