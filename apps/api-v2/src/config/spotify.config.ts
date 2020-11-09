import { registerAs } from '@nestjs/config';

export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  callbackURL: string;
}

export const spotifyConfig = registerAs(
  'spotify',
  (): SpotifyConfig => ({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
  })
);
