import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private _usersService: UsersService) {}

  async register(email: string, password: string) {
    // ensure unique user email
    const existingUsers = await this._usersService.find(email);
    if (existingUsers.length > 0) {
      throw new BadRequestException(
        `email address ${email} is already in use!`,
      );
    }
    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    // create new user and save
    const user = await this._usersService.create(email, result);

    // return the user
    return user;
  }

  async authenticate(email: string, password: string) {
    const [user] = await this._usersService.find(email);
    if (!user) {
      throw new NotFoundException(
        `User with email address ${email} was found!`,
      );
    }
    const [salt, hash] = user.password.split('.');
    const supplied = (await scrypt(password, salt, 32)) as Buffer;

    if (hash !== supplied.toString('hex')) {
      throw new BadRequestException('password is incorrect - please try again');
    } else {
      console.log('authentication successful!');
      return user;
    }
  }
}
