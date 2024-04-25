import { Injectable, NotFoundException } from '@nestjs/common';
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

  async changeApproval(id: string, approved: boolean) {
    const report = await this._repo.findOne({
      where: { id: parseInt(id) },
    });

    if (!report) {
      throw new NotFoundException(`report with id ${id} dosen't exist`);
    }

    report.approved = approved;

    return this._repo.save(report);
  }
}
