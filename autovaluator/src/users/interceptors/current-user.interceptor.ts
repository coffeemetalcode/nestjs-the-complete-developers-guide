import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private _usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.session || {};

    if (id) {
      const user = await this._usersService.findOne(id);
      request.CurrentUser = user;
    }

    return handler.handle();
  }
}
