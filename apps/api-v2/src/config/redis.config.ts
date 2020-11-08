import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  port: number;
  host: string;
  password: string;
}

export const redisConfig = registerAs(
  'redis',
  (): RedisConfig => ({
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  })
);
