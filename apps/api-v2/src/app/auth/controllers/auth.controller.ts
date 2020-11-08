import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { RequestWithSession } from '../interfaces/request-with-session';

@Controller('auth')
export class AuthController {
  @Post('logout')
  logout(@Req() request: RequestWithSession, @Res() res) {
    if (request.session && request.session.destroy) {
      request.session.destroy(() => {
        res.redirect(HttpStatus.FOUND, '/');
      });
    } else {
      res.redirect(HttpStatus.FOUND, '/');
    }
  }
}
