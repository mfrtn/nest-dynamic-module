import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [
    SmsModule, // error
    // SmsModule.forRoot({ apiKey: 0 }), // No Error but need to config SmsModule each time in every module.
  ],
  providers: [AuthService],
})
export class AuthModule {}
