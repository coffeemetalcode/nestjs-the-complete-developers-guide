import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Report } from './report.entity';
import { CreateReportDTO } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private _repo: Repository<Report>,
  ) {}

  create(reportDTO: CreateReportDTO, user: User) {
    const report = this._repo.create(reportDTO);
    report.user = user;

    this._repo.save(report);
    return report;
  }
}
