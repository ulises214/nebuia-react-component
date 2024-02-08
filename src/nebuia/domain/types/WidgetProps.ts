import { NebuiaKeys } from 'nebuia-ts/models';

import { PromiseCallback, PromiseOrValueCallback } from './ParamCallback';

export type WidgetProps = {
  kyc?: string;
  email?: string;
  phone?: string;
  onFinish: PromiseCallback<string>;
  getKeys: PromiseOrValueCallback<NebuiaKeys>;
  withDetailsPage?: boolean;
  reportType: 'KYC' | 'SIGNATURE' | 'CREDITS_ENROLLMENT';
};
