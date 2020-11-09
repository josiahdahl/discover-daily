import { Model } from 'objection';

export class UserModel extends Model {
  id: string;
  email: string;
  spotifyId: string;
  displayName: string;

  static get tableName() {
    return 'users';
  }
}
