import { ConfigurableModuleBuilder } from '@nestjs/common';

import { NestSmsOptions } from './sms.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<NestSmsOptions>()
    .setClassMethodName('forRoot')
    .build();
