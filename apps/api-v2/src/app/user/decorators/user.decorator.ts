import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from '../models/user.model';

export const ReqUser = createParamDecorator<
  unknown,
  ExecutionContext,
  UserModel
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
