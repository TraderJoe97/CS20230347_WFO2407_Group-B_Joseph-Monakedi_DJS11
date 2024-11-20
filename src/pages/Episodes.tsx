import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { setCurrentEpisode } from '../store/playerSlice';

interface Episode {
  episode: number;
  title: string;
  description: string;
  file: string;
}

interface Season {
  season: number;
  episodes: Episode[];
}

interface Show {
  id: number;
  seasons: Season[];
}

export default function Episodes () {
  const { seasonId } = useParams<{seasonId: string }>();
  const show = useOutletContext<Show>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show && seasonId) {
      const season = show.seasons.find(s => s.season === parseInt(seasonId));
      if (season) {
        setEpisodes(season.episodes);
      }
    }
  }, [show, seasonId]);

  const handlePlay = (episode: Episode) => {
    dispatch(setCurrentEpisode({
      id: episode.episode,
      title: episode.title,
      file: episode.file,
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Season {seasonId} Episodes</h2>
      {episodes.map((episode) => (
        <Card key={episode.episode}>
          <CardHeader>
            <CardTitle>{episode.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{episode.description}</p>
            <Button onClick={() => handlePlay(episode)}>Play Episode</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

