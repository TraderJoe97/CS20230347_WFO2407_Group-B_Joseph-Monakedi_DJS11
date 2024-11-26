import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

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
              <p>
                {episodeProgress.showTitle +
                  " season:" +
                  episodeProgress.seasonId}
              </p>
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
