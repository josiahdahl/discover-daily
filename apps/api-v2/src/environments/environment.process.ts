import { ApiV2EnvironmentProcess } from './environment.interface';

export const environmentProcess: ApiV2EnvironmentProcess = {
  sessionSecretKey: process.env.SESSION_SECRET_KEY,
  port: parseInt(process.env.PORT, 10),
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
  },
};
