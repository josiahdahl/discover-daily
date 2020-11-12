import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReqUser } from './user/decorators/user.decorator';
import { UserModel } from './user/models/user.model';
import { SessionGuard } from './auth/guards/session.guard';

@Controller()
export class AppController {
  @Get()
  hello() {
    return 'Hello World!';
  }
}
