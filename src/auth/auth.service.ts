import { Injectable } from '@nestjs/common';

import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class AuthService {
  constructor(private readonly smsService: SmsService) {}
}
