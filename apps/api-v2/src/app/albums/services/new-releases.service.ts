import { Injectable } from '@nestjs/common';
import { SpotifyTokenService } from '../../spotify/service/spotify-token.service';
import { spotify } from '@discover-daily/integrations/spotify';

@Injectable()
export class NewReleasesService {
  constructor(private spotifyTokenService: SpotifyTokenService) {}

  async newReleases(spotifyId: string) {
    const accessToken = await this.spotifyTokenService.getAccessToken(
      spotifyId
    );
    return spotify(accessToken).newReleases();
  }
}
