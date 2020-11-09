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

  @UseGuards(SessionGuard)
  @Get('private')
  guarded(@ReqUser() user: UserModel) {
    return `You made it here, ${user.displayName}`;
  }
}
