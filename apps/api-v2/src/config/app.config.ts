import { registerAs } from '@nestjs/config';

export interface AppConfig {
  sessionSecretKey: string;
  port: number;
}
export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    sessionSecretKey: process.env.SESSION_SECRET_KEY,
    port: parseInt(process.env.PORT, 10) || 3333,
  })
);
