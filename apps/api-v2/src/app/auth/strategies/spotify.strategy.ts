import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Profile,
  Strategy,
  StrategyOptions,
  VerifyCallback,
  VerifyFunction,
} from 'passport-spotify';
import { ConfigService } from '@nestjs/config';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { SpotifyTokenService } from '../../spotify/service/spotify-token.service';

export interface SpotifyStrategyValidator {
  validate: VerifyFunction;
}

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify')
  implements SpotifyStrategyValidator {
  constructor(
    private config: ConfigService,
    private spotifyAuthService: SpotifyAuthService,
    private spotifyTokenService: SpotifyTokenService
  ) {
    super({
      clientID: config.get('spotify.clientId'),
      clientSecret: config.get('spotify.clientSecret'),
      callbackURL: config.get('spotify.callbackURL'),
      passReqToCallback: false,
      // scope?: string[];
      // showDialog?: boolean;
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    try {
      const user = await this.spotifyAuthService.findOrCreateUser(profile);
      if (!!user) {
        await this.spotifyTokenService.setAccessToken(profile.id, accessToken);
        await this.spotifyTokenService.setRefreshToken(
          profile.id,
          refreshToken
        );
        return done(null, user);
      }
    } catch (e) {
      Logger.error(e);
      done(new UnauthorizedException());
    }
  }
}
