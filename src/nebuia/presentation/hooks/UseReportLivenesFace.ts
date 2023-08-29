import { useEffect, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { useNebuiaSdk } from './UseRepository';

export const useReportLivenessFace: ActionHookResponse<string> = () => {
  const sdk = useNebuiaSdk();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [livenessFace, setLivenessFace] = useState<string>();

  useEffect(() => {
    const getLivenessFace = async () => {
      const livenessFace = await sdk.getFace();

      if (!livenessFace.status) {
        setError(livenessFace.payload);

        return;
      }
      const { payload } = livenessFace;

      const data = URL.createObjectURL(
        new Blob([payload], {
          type: 'image/jpeg',
        }),
      );

      setLivenessFace(data);
    };
    getLivenessFace().finally(() => setIsLoading(false));
  }, [sdk]);

  return [isLoading, error, livenessFace];
};
