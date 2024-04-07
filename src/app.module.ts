import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SmsModule } from './sms/sms.module';
import { KavenegarConfigs } from 'kavenegar-api';

@Module({
  imports: [
    AuthModule,
    SmsModule.forRoot<KavenegarConfigs>({
      apiKey: 0,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
