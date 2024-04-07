import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsModule } from './sms/sms.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SmsModule.forRoot({ apiKey: 0 })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Time"', () => {
      const date = new Date();
      appController.getHello().then((response) => {
        expect(response.year).toBe(date.getFullYear());
        expect(response.month).toBe(date.getMonth() + 1);
      });
    });
  });
});
