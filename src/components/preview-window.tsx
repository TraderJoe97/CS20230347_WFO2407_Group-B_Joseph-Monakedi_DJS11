import { useState, useEffect} from "react";

interface PodcastPreview {
  id: number
  title: string
  description: string
  seasons: number
  image: string
  genreIds: number[]
  updated: string
}
export default function PodcastPreviewList() {
    const [podcasts, setPodcasts] = useState<PodcastPreview[]>([]);
    useEffect(() => {
        fetch("https://podcast-api.netlify.app/")
            .then((res) => res.json())
            .then((data) => setPodcasts(data));
    }, []);
    return (
        <div>
            <h1>Podcast Preview List</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {podcasts.map((podcast) => (
                    <div key={podcast.id} className="flex flex-col p-4 border rounded-lg shadow-md">
                        <h2 className="font-bold">{podcast.title}</h2>
                        <p className="mt-2 text-sm">{podcast.description}</p>
                        <img src={podcast.image} alt={podcast.title} className="w-full mt-4" />
                    </div>
                ))}
            </div>
        </div>
    );
}
