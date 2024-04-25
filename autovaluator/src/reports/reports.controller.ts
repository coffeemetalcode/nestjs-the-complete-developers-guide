import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApproveReportDTO } from './dtos/approve-report.dto';
import { CreateReportDTO } from './dtos/create-report.dto';
import { GetEstimateDTO } from './dtos/get-estimate.dto';
import { ReportDTO } from './dtos/report.dto';
import { ReportsService } from './reports.service';

import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private _reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDTO) {
    return this._reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this._reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  changeApproval(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    this._reportsService.changeApproval(id, body.approved);
  }
}
