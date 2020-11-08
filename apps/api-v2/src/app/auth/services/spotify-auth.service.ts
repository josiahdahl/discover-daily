import { Inject, Injectable, Logger } from '@nestjs/common';
import { Profile } from 'passport-spotify';
import { UserModel } from '../../user/models/user.model';
import { UserService } from '../../user/services/user.service';
import { get } from 'lodash';

@Injectable()
export class SpotifyAuthService {
  constructor(
    @Inject(UserModel) private userModel: typeof UserModel,
    private userService: UserService
  ) {}
  async findOrCreateUser(profile: Profile) {
    const existingUser = await this.userModel
      .query()
      .findOne('spotifyId', '=', profile.id);

    if (typeof existingUser !== 'undefined') {
      Logger.log(`Found existing user with id ${existingUser.id}`);
      return existingUser;
    }

    return this.userService.create({
      spotifyId: profile.id,
      displayName: profile.displayName,
      email: get(profile, 'emails[0].value', undefined),
    });
  }
}
