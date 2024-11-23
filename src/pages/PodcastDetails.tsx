import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function PodcastDetails() {
  const params = useParams();
  const showId = params.id;
  const [show, setShow] = useState<show>();

  interface show {
    id: number;
    title: string;
    description: string;
    seasons: Array<season>;
    image: string;
  }

  interface season {
    id: number;
    title: string;
    image: string;
    episodes: Array<episode>;
  }

  interface episode {
    id: number;
    title: string;
    file: string;
  }

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((res) => res.json())
      .then((data) => setShow(data));
  }, [showId]);
  return (
    <div>
      {show ? (
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>{show.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                className="rounded w-full"
                src={show.image}
                alt={show.title}
              />
            </CardContent>
            <CardDescription>
              <p className="mx-5">{show.description}</p>
            </CardDescription>
            <CardFooter>Seasons {show.seasons.length}</CardFooter>
          </Card>
          <Outlet context={show} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
