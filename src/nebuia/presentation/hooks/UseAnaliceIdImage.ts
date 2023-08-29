import { useEffect, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { useNebuiaSdk } from './UseRepository';

type T = {
  onSetImage: (image: string) => void;
  image?: File;
};
export const useAnaliceIdImage: ActionHookResponse<string, T> = ({
  onSetImage,
  image,
}) => {
  const sdk = useNebuiaSdk();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [croppedImage, setCroppedImage] = useState<string>();

  useEffect(() => {
    if (!image) {
      return;
    }
    const uploadImage = async () => {
      const res = await sdk.analiceID(image);
      if (!res.status) {
        setError(res.payload);

        return;
      }
      onSetImage(res.payload.image);
      setCroppedImage(res.payload.image);
    };
    setLoading(true);
    uploadImage().finally(() => setLoading(false));
  }, [image, onSetImage, sdk]);

  return [loading, error, croppedImage];
};
