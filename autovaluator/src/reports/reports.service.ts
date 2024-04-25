import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Report } from './report.entity';
import { CreateReportDTO } from './dtos/create-report.dto';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

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

  async createEstimate({
    make,
    model,
    lon,
    lat,
    mileage,
    year,
  }: GetEstimateDTO) {
    return await this._repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lon - :lon BETWEEN -5 AND 5', { lon })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
