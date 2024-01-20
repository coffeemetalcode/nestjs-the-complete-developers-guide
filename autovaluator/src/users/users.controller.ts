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
  // UseInterceptors,
} from '@nestjs/common';

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
  constructor(private _usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDTO) {
    this._usersService.create(body.email, body.password);
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
