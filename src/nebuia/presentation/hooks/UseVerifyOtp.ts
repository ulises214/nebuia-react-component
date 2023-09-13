import { useCallback, useMemo, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { PromiseCallback } from '../../domain/types/ParamCallback';
import { useNebuiaSdk } from './UseRepository';

export const useVerifyOtp: ActionHookResponse<
  { result?: string; send: PromiseCallback; clearError: VoidFunction },
  {
    type: 'email' | 'phone';
    otp: string;
  }
> = ({ type, otp }) => {
  const sdk = useNebuiaSdk();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string>();

  const send = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    const res = await sdk.verifyOTPCode({
      code: otp,
      toEmail: type === 'email',
    });
    res.status && setValue('ok');
    !res.status && setError(res.payload);
    setLoading(false);
  }, [otp, sdk, type]);

  const result = useMemo(() => {
    return {
      result: value,
      send,
      clearError: () => setError(undefined),
    };
  }, [send, value]);

  return [loading, error, result];
};
