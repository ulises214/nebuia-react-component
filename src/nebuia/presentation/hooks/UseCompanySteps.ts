import { useEffect, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { useNebuiaSdk } from './UseRepository';

export const useCompanySteps: ActionHookResponse<string[]> = () => {
  const sdk = useNebuiaSdk();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [steps, setSteps] = useState<string[]>();

  useEffect(() => {
    const getStepsCompany = async () => {
      const response = await sdk.getStepsCompany();
      response.status && setSteps(response.payload);
      !response.status && setError(response.payload);
    };
    setIsLoading(true);
    getStepsCompany().finally(() => setIsLoading(false));
  }, [sdk]);

  return [isLoading, error, steps];
};
