import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../../database/providers/redis-client.provider';

@Injectable()
export class SpotifyTokenService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}
  storeAccessToken(spotifyId: string, accessToken: string) {
    return this.redis.set(this.makeKey(spotifyId, 'access'), accessToken);
  }

  storeRefreshToken(spotifyId: string, refreshToken: string) {
    return this.redis.set(this.makeKey(spotifyId, 'refresh'), refreshToken);
  }

  getAccessToken(spotifyId: string) {
    return this.redis.get(this.makeKey(spotifyId, 'access'));
  }

  getRefreshToken(spotifyId: string) {
    return this.redis.get(this.makeKey(spotifyId, 'refresh'));
  }

  private makeKey(spotifyId: string, type: string) {
    return `spotify:${spotifyId}:token:${type}`;
  }
}
