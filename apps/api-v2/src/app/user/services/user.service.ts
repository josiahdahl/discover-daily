import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';

export type CreatableUser = Pick<UserModel, 'spotifyId'> &
  Partial<Pick<UserModel, 'email' | 'displayName'>>;

@Injectable()
export class UserService {
  constructor(@Inject(UserModel) private userModel: typeof UserModel) {}

  async create(user: CreatableUser) {
    return this.userModel.query().insertAndFetch(user);
  }

  findById(id: number) {
    return this.userModel.query().findById(id);
  }
}
