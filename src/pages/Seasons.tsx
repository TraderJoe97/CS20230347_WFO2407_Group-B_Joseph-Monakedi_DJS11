import { useOutletContext, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

interface show {
  id: number;
  title: string;
  description: string;
  seasons: Array<season>;
  image: string;
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
      <ol className="grid grid-cols-1 md:grid-cols3 lg:grid-cols-4 gap-5">
        {seasons.map((season: season) => (
          <li key={season.season} className="">
            <NavLink to={`/show/${id}/season/${season.season}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{season.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={season.image}
                    alt={season.title}
                    className="rounded"
                  />
                </CardContent>
                <CardFooter>Episodes {season.episodes.length}</CardFooter>
              </Card>
            </NavLink>
          </li>
        ))}
      </ol>
    </div>
  );
}
