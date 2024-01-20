import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot(DB_SQLITE_CONFIG),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
