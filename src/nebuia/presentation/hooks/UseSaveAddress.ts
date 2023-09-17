import { NebuiaAddress } from '@nebuia-ts/models';
import { useCallback, useMemo, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { PromiseCallback } from '../../domain/types/ParamCallback';
import { useNebuiaSdk } from './UseRepository';

type Props = {
  address: NebuiaAddress;
};
type Result = {
  retry: PromiseCallback<void, boolean>;
  success?: boolean;
};
export const useSaveAddress: ActionHookResponse<Result, Props> = ({
  address,
}) => {
  const sdk = useNebuiaSdk();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>();

  const retry = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    const res = await sdk.saveAddress(address);
    setIsLoading(false);
    if (res.status) {
      setSuccess(true);
    } else {
      setError(res.payload);
    }

    return res.status;
  }, [address, sdk]);

  const result = useMemo(
    () => ({
      retry,
      success,
    }),
    [retry, success],
  );

  return [isLoading, error, result];
};
