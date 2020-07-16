import { app } from '../core/app';
import { hasSession } from '../services/auth';
import { randomBytes } from "crypto";
import { asyncClient } from '../core/redis';

app.get('/api/auth/login', async (req, res) => {
  const state = randomBytes(4).toString('hex');
  await asyncClient('setex', state, 30, 'true');

  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code`
    + `&client_id=${process.env.SPOTIFY_CLIENT_ID}`
    + `&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`
    + `&state=${encodeURIComponent(state)}`
  );

})

app.get('/api/auth/session', async (req, res) => {
  if (await hasSession(req)) {
    res.status(200);
  } else {
    res.status(404);
  }
  res.send();
});
