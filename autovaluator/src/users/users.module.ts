import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    AuthService,
    // CurrentUserInterceptor, // <-- controller scoped interceptor
    UsersService,
  ],
})
export class UsersModule {}
