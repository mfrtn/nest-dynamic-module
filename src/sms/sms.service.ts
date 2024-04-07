import { Injectable, Inject } from '@nestjs/common';
import {
  MelipayamakApi,
  MelipayamakConfigs,
  SendSMSParams,
  VerifyLookupParams as MeliVerifyLookupParams,
} from '@mfrtn/melipayamak-api';
import {
  KavenegarApi,
  KavenegarConfigs,
  VerifyLookupParams,
  GetDateResponse,
} from 'kavenegar-api';

import {
  CommercialSMSParameters,
  VerifySMSParameters,
  Result,
} from './sms.interface';
import { MODULE_OPTIONS_TOKEN } from './sms.module-defenition';

@Injectable()
export class SmsService {
  private readonly smsProvider: string;
  private readonly api: MelipayamakApi | KavenegarApi;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: MelipayamakConfigs | KavenegarConfigs,
  ) {
    if ('apiKey' in this.options) {
      // It's a Kavenegar configuration
      this.smsProvider = 'kavenegar';
      const apiKey = this.options?.apiKey || 0;
      this.api = new KavenegarApi({ apiKey });
    } else if ('username' in this.options && 'password' in this.options) {
      // It's a Melipayamak configuration
      this.smsProvider = 'melipayamak';
      this.api = new MelipayamakApi(this.options);
    } else {
      throw new Error('Invalid SMS configuration options.');
    }
  }

  async send(data: CommercialSMSParameters): Promise<Result> {
    if (this.smsProvider === 'kavenegar') {
      const result = await (this.api as KavenegarApi).send(data);
      return {
        status: result[0].status,
        statusText: result[0].statustext,
      };
    } else if (this.smsProvider === 'melipayamak') {
      const convertedData: SendSMSParams = {
        from: data.sender,
        text: data.message,
        to: data.receptor,
      };
      const result = await (this.api as MelipayamakApi).send(convertedData);
      return {
        status: result.retStatus,
        statusText: result.strRetStatus,
      };
    }
  }

  async verifyLookup(data: VerifySMSParameters): Promise<Result> {
    if (this.smsProvider === 'kavenegar') {
      const convertedData: VerifyLookupParams = {
        receptor: data.receptor,
        template: data.template as string,
        token: data.tokens[0],
        token2: data.tokens[1],
        token3: data.tokens[2],
      };
      const result = await (this.api as KavenegarApi).verifyLookup(
        convertedData,
      );

      return {
        status: result[0].status,
        statusText: result[0].statustext,
      };
    } else if (this.smsProvider === 'melipayamak') {
      const convertedData: MeliVerifyLookupParams = {
        bodyId: data.template as number,
        text: data.tokens,
        to: data.receptor,
      };
      const result = await (this.api as MelipayamakApi).verifyLookup(
        convertedData,
      );
      return {
        status: result[0].status,
        statusText: result[0].statustext,
      };
    }
  }

  async testConnection(): Promise<GetDateResponse> {
    if (this.smsProvider === 'kavenegar') {
      return await (this.api as KavenegarApi).getDate();
    } else {
      throw new Error('Invalid SMS configuration options.');
    }
  }
}
