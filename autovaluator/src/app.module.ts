import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'auto_valuator_instance',
      entities: [Report, User],
      synchronize: true,
      host: '127.0.0.1', // <-- changed from 'localhost'
      port: 3306,
      username: 'avapp',
      password: 'Test123$',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
