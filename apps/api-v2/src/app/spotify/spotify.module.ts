import { Module } from '@nestjs/common';
import { SpotifyTokenService } from './service/spotify-token.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [SpotifyTokenService],
  exports: [SpotifyTokenService],
  imports: [DatabaseModule],
})
export class SpotifyModule {}
