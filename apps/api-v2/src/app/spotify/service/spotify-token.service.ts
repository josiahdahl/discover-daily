import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as url from 'url';
import { REDIS_CLIENT } from '../../database/providers/redis-client.provider';
import { ConfigService } from '@nestjs/config';
import { SpotifyRefreshResponseDto } from '../dto/spotify.dto';

@Injectable()
export class SpotifyTokenService {
  static readonly MAX_REFRESH_RETRIES = 3;

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private http: HttpService,
    private configService: ConfigService
  ) {}
  setAccessToken(spotifyId: string, accessToken: string) {
    return this.redis.set(this.makeKey(spotifyId, 'access'), accessToken);
  }

  setRefreshToken(spotifyId: string, refreshToken: string) {
    return this.redis.set(this.makeKey(spotifyId, 'refresh'), refreshToken);
  }

  getAccessToken(spotifyId: string) {
    return this.redis.get(this.makeKey(spotifyId, 'access'));
  }

  getRefreshToken(spotifyId: string) {
    return this.redis.get(this.makeKey(spotifyId, 'refresh'));
  }

  async refreshAccessToken(spotifyId: string) {
    const refreshToken = await this.getRefreshToken(spotifyId);
    const { clientId, clientSecret } = this.configService.get('spotify');
    const authHeader = `Basic ${new Buffer(
      `${clientId}:${clientSecret}`
    ).toString('base64')} `;
    const { data } = await this.http
      .post<SpotifyRefreshResponseDto>(
        'https://accounts.spotify.com/api/token',
        new url.URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }).toString(),
        { headers: { Authorization: authHeader } }
      )
      .toPromise();
    await this.setAccessToken(spotifyId, data.access_token);
  }

  private makeKey(spotifyId: string, type: string) {
    return `spotify:${spotifyId}:token:${type}`;
  }

  private async canRefreshRetries(spotifyId: string) {
    const retries = await this.redis.incr(`spotify:${spotifyId}:refresh-tries`);
    return retries <= SpotifyTokenService.MAX_REFRESH_RETRIES;
  }

  private async clearRefreshRetries(spotifyId: string) {
    await this.redis.del(`spotify:${spotifyId}:refresh-tries`);
  }
}
