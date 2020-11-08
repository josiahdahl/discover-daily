import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ReqUser } from '../../user/decorators/user.decorator';
import { UserModel } from '../../user/models/user.model';
import { SpotifyAuthGuard } from '../guards/spotify-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class SpotifyController {
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify')
  authenticate() {}

  @UseGuards(SpotifyAuthGuard)
  @Get('spotify/callback')
  callback(
    @Req() request,
    @ReqUser() user: UserModel,
    @Res() response: Response
  ) {
    request.session.userId = user.id;
    response.cookie('XSRF-TOKEN', request.csrfToken(), {
      maxAge: 60 * 60 * 24 * 30 /* 30 days */,
    });
    response.redirect(302, 'http://localhost:4200');
  }
}
