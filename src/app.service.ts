import { Injectable } from '@nestjs/common';
import { SmsService } from './sms/sms.service';

import { GetDateResponse } from 'kavenegar-api';

@Injectable()
export class AppService {
  constructor(private readonly smsService: SmsService) {}
  async getHello(): Promise<GetDateResponse> {
    return await this.smsService.testConnection();
  }
}
