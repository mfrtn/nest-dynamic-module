import { Module, DynamicModule } from '@nestjs/common';

import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './sms.module-defenition';

import { NestSmsOptions } from './sms.interface';
import { SmsService } from './sms.service';

@Module({})
export class SmsModule extends ConfigurableModuleClass {
  static forRoot<T>(options: NestSmsOptions<T>): DynamicModule {
    return {
      module: SmsModule,
      global: options.isGlobal,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
        SmsService,
      ],
      exports: [SmsService],
    };
  }
}
