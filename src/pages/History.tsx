import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";

export default function History() {
  const progress = useSelector((state: RootState) => state.progress);
  if (!progress.episodesProgress.length) {
    return <p>No episodes have been watched yet.</p>;
  }
  
  const history = [...progress.episodesProgress].sort((a,b) => b.lastPlayed - a.lastPlayed)
  return (
    <>
      <h1>History</h1>
      <div className="flex gap-2 flex-col">
        {history.map((episodeProgress, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{episodeProgress.episodeTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <NavLink
                to={`/show/${episodeProgress.showId}/season/${episodeProgress.seasonId}`}>
                {episodeProgress.showTitle +
                  " season:" +
                  episodeProgress.seasonId}
              </NavLink>
            </CardContent>
            <CardFooter>
              LastPlayed:{" "}
              {new Date(episodeProgress.lastPlayed).toLocaleString()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
