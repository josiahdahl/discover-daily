import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async userFromSession(session: any) {
    if (!session.userId) {
      return false;
    }
    const user = await this.userService.findById(session.userId);
    return user ? user : false;
  }
}
