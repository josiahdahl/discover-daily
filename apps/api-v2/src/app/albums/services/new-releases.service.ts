import { Injectable } from '@nestjs/common';
import { SpotifyApiService } from '../../spotify/service/spotify-api.service';

@Injectable()
export class NewReleasesService {
  constructor(private spotifyApiService: SpotifyApiService) {}

  newReleases(spotifyId: string) {
    return this.spotifyApiService.newReleases(spotifyId);
  }
}
