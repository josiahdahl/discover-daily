import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { NewReleasesService } from '../services/new-releases.service';
import { ReqUser } from '../../user/decorators/user.decorator';
import { UserModel } from '../../user/models/user.model';
import { SessionGuard } from '../../auth/guards/session.guard';

@Controller('new-releases')
export class NewReleasesController {
  constructor(private newReleasesService: NewReleasesService) {}
  @Get('')
  async all(@ReqUser() user: UserModel) {
    return this.newReleasesService.newReleases(user.spotifyId);
  }
}
