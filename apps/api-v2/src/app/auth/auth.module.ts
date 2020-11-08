import { Module } from '@nestjs/common';
import { SpotifyController } from './controllers/spotify.controller';
import { SpotifyStrategy } from './strategies/spotify.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from '../user/models/user.model';
import { UserModule } from '../user/user.module';
import { SpotifyAuthService } from './services/spotify-auth.service';
import { AuthController } from './controllers/auth.controller';
import { SpotifyModule } from '../spotify/spotify.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [SpotifyController, AuthController],
  providers: [SpotifyStrategy, SpotifyAuthService],
  imports: [
    PassportModule.register({ defaultStrategy: 'spotify', session: true }),
    ConfigModule,
    ObjectionModule.forFeature([UserModel]),
    UserModule,
    SpotifyModule,
  ],
})
export class AuthModule {}
