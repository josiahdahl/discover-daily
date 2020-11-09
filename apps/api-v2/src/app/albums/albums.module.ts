import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NewReleasesController } from './controllers/new-releases.controller';
import { NewReleasesService } from './services/new-releases.service';
import { SpotifyModule } from '../spotify/spotify.module';

@Module({
  controllers: [NewReleasesController],
  providers: [NewReleasesService],
  imports: [DatabaseModule, SpotifyModule],
})
export class AlbumsModule {}
