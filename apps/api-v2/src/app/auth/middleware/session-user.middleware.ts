import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../user/services/user.service';
import { RequestWithSession } from '../interfaces/request-with-session';

@Injectable()
export class SessionUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: RequestWithSession, res: Response, next: Function) {
    if (req.session.userId) {
      req.user = await this.userService.findById(req.session.userId);
    }
    next();
  }
}
