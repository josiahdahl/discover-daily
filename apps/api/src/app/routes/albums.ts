import { app } from '../core/app';
import { getSpotifyAccessToken } from '../services/auth';
import { spotify } from '../services/spotify';

app.get('/api/new-releases', async (req, res) => {
  const token = await getSpotifyAccessToken(req);
  const albums = await spotify(token).newReleases();
  res.status(200).contentType('application/json').send(albums);
});
