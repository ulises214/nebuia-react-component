import { useCallback, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { useNebuiaSdk } from './UseRepository';

export const useSendOtp: ActionHookResponse<
  VoidFunction,
  { type: 'email' | 'phone'; onRequested?: () => void }
> = ({ onRequested, type }) => {
  const sdk = useNebuiaSdk();
  const [loading, setLoading] = useState(false);

  const sendOtp = useCallback(() => {
    setLoading(true);
    onRequested?.();
    sdk
      .generateOTPCode({
        toEmail: type === 'email',
      })
      .finally(() => setLoading(false));
  }, [onRequested, sdk, type]);

  return [loading, undefined, sendOtp];
};
