import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  // UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
import {
  Serialize,
  // SerializeInterceptor,
} from '../interceptors/serialize.interceptor';
import { UsersService } from '../users/users.service';

@Serialize(UserDTO)
@Controller('auth')
export class UsersController {
  constructor(
    private _authService: AuthService,
    private _usersService: UsersService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this._authService.register(body.email, body.password);
    session.user = user.id;
    console.log('signup user', user.id);

    return user;
  }

  @Post('/signin')
  async authenticate(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this._authService.authenticate(
      body.email,
      body.password,
    );
    console.log('signin user', user.id);
    session.user = user.id;

    return user;
  }

  @Get('/whoam')
  async whoAm(@Session() session: any) {
    return await this._usersService.findOne(session.user);
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.user = null;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDTO))
  // @Serialize(UserDTO)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this._usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    return user;
  }

  // @Serialize(UserDTO)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this._usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this._usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this._usersService.remove(parseInt(id));
  }
}
