import { Injectable } from '@nestjs/common';

import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  constructor(private _powerService: PowerService) {}

  getData() {
    console.log('Drawing 20 watts from Power Service');
    this._powerService.supplyPower(20);
    return 'Data has been fetched.';
  }
}
