import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Response, Request } from 'express';

import { UsersService } from '../users.service';
import { User } from '../user.entity';

/* Add optional user field to Express Request interface */
declare module 'express' {
  interface Request {
    user?: User;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private _usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.session || {};

    if (id) {
      const user = await this._usersService.findOne(id);

      req.user = user;
    }

    next();
  }
}
