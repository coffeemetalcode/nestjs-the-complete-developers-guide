import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import CookieSession from 'cookie-session';

// * added tsconfig.json configuration to overcome this
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const CookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    CookieSession({
      keys: ['random-string'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3009);
}
bootstrap();
