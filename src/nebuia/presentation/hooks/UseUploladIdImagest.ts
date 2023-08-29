import { useCallback, useMemo, useState } from 'react';

import { b64toBlob } from '../../../common/domain/utils/blob';
import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { PromiseCallback } from '../../domain/types/ParamCallback';
import { useNebuiaSdk } from './UseRepository';

type Props = {
  docType: 'ine' | 'passport';
  images: string[];
};
export const useUploadIdImages: ActionHookResponse<
  {
    retry: PromiseCallback;
    result?: string;
  },
  Props
> = ({ docType, images }) => {
  const sdk = useNebuiaSdk();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string>();

  const retry = useCallback(async () => {
    setError(undefined);
    setResult(undefined);
    setLoading(true);
    const res = await sdk.uploadID({
      images: images.map((img) => {
        return b64toBlob(img, 'image/jpeg');
      }),
      name: docType === 'passport' ? 'passport' : 'id',
    });
    res.status && setResult(res.payload as string);
    !res.status && setError(res.payload);
    setLoading(false);
  }, [docType, images, sdk]);

  const finalResult = useMemo(
    () => ({
      retry,
      result,
    }),
    [result, retry],
  );

  return [loading, error, finalResult];
};
