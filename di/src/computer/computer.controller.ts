import { Controller, Get } from '@nestjs/common';

import { CpuService } from '../cpu/cpu.service';
import { DiskService } from '../disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private _cpuService: CpuService,
    private _diskService: DiskService,
  ) {}

  @Get()
  run() {
    return [this._cpuService.compute(4, 9), this._diskService.getData()];
  }
}
