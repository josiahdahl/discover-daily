import { randomBytes } from 'crypto';
import { app } from '../core/app';
import { asyncClient } from '../core/redis';
import { stringify } from 'qs';
import Axios from 'axios';
import { SpotifyTokenDto } from '../interfaces/spotify';
import { createSession } from '../services/auth';

function redirectUri(message?: string) {
  return `${process.env.CLIENT_URI}/login${message ? `#${encodeURIComponent(message)}` : ''}`;
}

app.get('/api/spotify/callback', async (req, res) => {
  const { code, state, error } = req.query;
  const validState = await asyncClient('get', decodeURIComponent(state as string));
  if (!validState) {
    res.redirect(redirectUri('error=invalid_state'));
    return;
  }
  if (typeof error !== 'undefined') {
    res.redirect(redirectUri(`error=${error}`));
    return;
  }
  try {

  const authRes = await Axios.post<SpotifyTokenDto>('https://accounts.spotify.com/api/token', stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
  }), { headers: {'Content-Type': 'application/x-www-form-urlencoded' }});
  if (authRes.status !== 200) {
    res.redirect(redirectUri('error=auth_failed'));
    return;
  }
  const { data } = authRes;

  await createSession(data.access_token, data.refresh_token, res);
  res.redirect(`${process.env.CLIENT_URI}/login?success`);

  } catch (e) {
    console.error(e);
    res.redirect(redirectUri('error=auth_failed'))
  }
});

// FUTURE: Refresh Tokens
