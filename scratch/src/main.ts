// import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module'

/* Moved to app.controller.ts file */
/* @Controller()
class AppController {

  @Get()
  getRootRoute(): string {
    return 'Hello there!';
  }
} */

/* Moved to app.module.ts file */
/* @Module({
  controllers: [ AppController ]
})
class AppModule {} */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3006);
}

bootstrap();