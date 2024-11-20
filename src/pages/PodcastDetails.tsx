import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function PodcastDetails() {
    const params = useParams();
    const showId = params.id
    const [show,setShow] = useState<show>();

    interface show {
        id: number,
        title: string,
        description: string,
        seasons: Array<season>,
        image: string,
    }

    interface season {
        id: number,
        title: string,
        image: string,
        episodes: Array<episode>,
    }
    
    interface episode {
        id: number,
        title: string,
        file: string,
    }
    
    useEffect(
        () => { fetch(`https://podcast-api.netlify.app/id/${showId}`)
        .then((res) => res.json())
        .then((data) => setShow(data))
        },[]
    )
    return (
        <div>
            {show ? (
                <div>
                    <img className="w-full"src={show.image} alt={show.title} />
                    <h1 className="text-3xl">{show.title}</h1>
                    <p>{show.description}</p>
                    <h2>Seasons</h2>
                    <div className="grid grid-cols-4 grid gap-2">
                        {show.seasons.map((season) => (
                            <div key={season.id}>
                                <h3>{season.title}</h3>
                                <img src={season.image} alt={season.title} />
                                <h4>Episodes</h4>
                                {season.episodes.map((episode) => (
                                    <div key={episode.id}>
                                        <h5>{episode.title}</h5>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}