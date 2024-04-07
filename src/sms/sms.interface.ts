import { MelipayamakConfigs } from '@mfrtn/melipayamak-api';
import { KavenegarConfigs } from 'kavenegar-api';

export type CommercialSMSParameters = {
  receptor: string | string[];
  message: string;
  sender: string;
};

export type VerifySMSParameters = {
  receptor: string;
  tokens: [string, string, string];
  template: number | string;
};

export type Result = {
  status: number;
  statusText: string;
};

export type NestSmsOptions<T = MelipayamakConfigs | KavenegarConfigs> = T & {
  isGlobal?: boolean;
};
