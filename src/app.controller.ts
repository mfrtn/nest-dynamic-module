import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GetDateResponse } from 'kavenegar-api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<GetDateResponse> {
    return await this.appService.getHello();
  }
}
