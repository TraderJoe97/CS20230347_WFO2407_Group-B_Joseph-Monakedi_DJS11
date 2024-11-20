import { useOutletContext, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
    
interface show {
    id: number,
    title: string,
    description: string,
    seasons: Array<season>,
    image: string,
}
interface season {
    season: number;
    title: string;
    image: string;
    episodes: Array<episode>;
}
interface episode {
    id: number;
    title: string;
    file: string;
}

export default function Seasons() {
    const show = useOutletContext<show>();
    const { id } = useParams<{ id: string }>();
    const seasons: season[] = Array.from(show.seasons); // Fix: Convert show.seasons to an array

    return (
        <div>
            <ol className="grid grid-cols-4 gap-10">
                {seasons.map((season: season) => (
                    <li key={season.season} className="">
                        <Link 
                        to={`/show/${id}/season/${season.season}`}>
                            <h3>{season.title}</h3>
                            <img src={season.image} alt={season.title} className=""/>
                            <h4>Episodes {season.episodes.length}</h4>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}

      