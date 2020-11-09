import { HttpModule, Module } from '@nestjs/common';
import { SpotifyTokenService } from './service/spotify-token.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SpotifyApiService } from './service/spotify-api.service';

@Module({
  providers: [SpotifyTokenService, SpotifyApiService],
  exports: [SpotifyTokenService, SpotifyApiService],
  imports: [DatabaseModule, HttpModule, ConfigModule],
})
export class SpotifyModule {}
