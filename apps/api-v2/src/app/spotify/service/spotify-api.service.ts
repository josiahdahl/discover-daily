import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpotifyTokenService } from './spotify-token.service';
import {
  InvalidAccessTokenException,
  spotify,
} from '@discover-daily/integrations/spotify';

@Injectable()
export class SpotifyApiService {
  constructor(
    private config: ConfigService,
    private spotifyTokenService: SpotifyTokenService
  ) {}

  async newReleases(spotifyId: string) {
    let accessToken = await this.spotifyTokenService.getAccessToken(spotifyId);
    try {
      return await spotify(accessToken).newReleases();
    } catch (e) {
      if (e instanceof InvalidAccessTokenException) {
        Logger.warn('Access token expired, refreshing');
        await this.spotifyTokenService.refreshAccessToken(spotifyId);
        return this.newReleases(spotifyId);
      }
      Logger.error('Cannot fetch new releases');
      throw new UnauthorizedException();
    }
  }
}
