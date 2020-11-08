import IORedis from 'ioredis';
import { ConfigService } from '@nestjs/config';

export const REDIS_CLIENT = Symbol('Redis Client');

export const redisProvider = {
  provide: REDIS_CLIENT,
  useFactory: (config: ConfigService) => {
    return new IORedis(config.get('redis'));
  },
  inject: [ConfigService],
};
