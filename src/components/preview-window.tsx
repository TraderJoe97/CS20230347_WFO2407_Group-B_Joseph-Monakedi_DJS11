import { useState, useEffect} from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent  } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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

export default function PodcastPreviewList() {
    const [podcasts, setPodcasts] = useState<PodcastPreview[]>([]);
    useEffect(() => {
        fetch("https://podcast-api.netlify.app/")
            .then((res) => res.json())
            .then((data) => setPodcasts(data.sort((a: PodcastPreview, b: PodcastPreview) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))));
    }, []);
    return (
        <ScrollArea className="h-full px-5">
            <h1>Podcast Preview List</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {podcasts.map((podcast) => (
                    <Card 
                    key={podcast.id} 
                    style={
                        {backgroundImage: `url(${podcast.image})`,
                        backgroundSize: "100% 100%",
                         
                        aspectRatio: "1/1",}
                    }>  
                        <button className="h-full">
                        <CardContent className="relative top-0 inset-0 flex flex-col place-content-between h-full bg-white bg-opacity-85 dark:bg-gray-950  dark:bg-opacity-85 opacity-0 transition-opacity duration-500 hover:opacity-100">
                            <CardHeader className="h-4/5">
                                <CardTitle className="text-left">{podcast.title}</CardTitle>
                                <CardDescription className="text-current text-left overflow-y-auto">
                                    <ScrollArea className="h-full px-2">{podcast.description}<ScrollBar/></ScrollArea>
                                </CardDescription>
                            </CardHeader>  
                            <CardFooter className="flex flex-col content-start text-left text-sm">
                                <p className="w-full flex text-left">Updated: {new Date(podcast.updated).toLocaleString("en-ZA", { month: "long", day: "numeric", year: "numeric" })}</p>
                                <p className="w-full flex text-left">Seasons: {podcast.seasons}</p>
                                <p className="w-full flex text-left">Genres: {podcast.genres.map((id) => genres[id]).join(", ")}</p>
                            </CardFooter>
                        </CardContent>
                        </button>
                    </Card>
                ))}
            </div>
            <ScrollBar orientation="vertical"/>
        </ScrollArea>
    );
}
