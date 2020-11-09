import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from './models/user.model';
import { UserService } from './services/user.service';

@Module({
  providers: [UserService],
  imports: [ObjectionModule.forFeature([UserModel])],
  exports: [ObjectionModule, UserService],
})
export class UserModule {}
