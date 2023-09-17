import { NebuiaAddress } from '@nebuia-ts/models';
import { useEffect, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { useNebuiaSdk } from './UseRepository';

type T = {
  image?: File;
};
export const useAnaliceAddress: ActionHookResponse<NebuiaAddress, T> = ({
  image,
}) => {
  const sdk = useNebuiaSdk();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [address, setAddress] = useState<NebuiaAddress>();

  useEffect(() => {
    setError(undefined);
    setAddress(undefined);
    if (!image) {
      return;
    }
    const uploadImage = async () => {
      const res = await sdk.getAddress({
        img: image,
        isPDF: image.type === 'application/pdf',
      });
      if (!res.status) {
        setError(res.payload);

        return;
      }
      setAddress(res.payload);
    };
    setLoading(true);
    setError(undefined);
    setAddress(undefined);
    uploadImage()
      .finally(() => setLoading(false))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      });
  }, [image, sdk]);

  return [loading, error, address];
};
