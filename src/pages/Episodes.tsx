import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { setCurrentEpisode, resetPlayer } from '../store/playerSlice';
import { NavLink } from 'react-router-dom';

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
      dispatch(resetPlayer());
      dispatch(setCurrentEpisode({
        id: episode.episode,
        title: episode.title,
        file: episode.file,
      }));
  
  };

  return (
    <div className="space-y-6">
      <NavLink to={`/show/${show.id}`}>
        <Button>Back to all Seasons</Button>
      </NavLink>
      <h2 className="text-2xl font-bold">Season {seasonId} Episodes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" >
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
    </div>
  );
};

