import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import CookieSession from 'cookie-session';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/report.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DB_MYSQL_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  database: 'auto_valuator_instance',
  entities: [Report, User],
  synchronize: true,
  host: '127.0.0.1', // <-- changed from 'localhost'
  port: 3306,
  username: 'avapp',
  password: 'Test123$',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DB_SQLITE_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'auto.valuator.instance.sqlite',
  entities: [Report, User],
  synchronize: true,
};

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
    }),
    ReportsModule,
    TypeOrmModule.forRoot(),
    /* TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [Report, User],
        };
      },
    }), */
    UsersModule,
    // TypeOrmModule.forRoot(DB_MYSQL_CONFIG),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private _configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CookieSession({
          keys: [this._configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
