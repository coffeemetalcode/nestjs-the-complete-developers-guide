import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportDTO } from './dtos/report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private _reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this._reportsService.create(body, user);
  }
}
