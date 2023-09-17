import { NebuiaStepNames } from '@nebuia-ts/models';
import { FC, PropsWithChildren, useMemo, useState } from 'react';

import { useCompanySteps } from '../../hooks/UseCompanySteps';
import { companyStepsContext } from './context';

export const CompanyStepsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, error, steps] = useCompanySteps();
  const [currentStep, setCurrentStep] = useState<NebuiaStepNames>();

  const value = useMemo(
    () => ({
      isLoading,
      setCurrentStep,
      steps: steps as NebuiaStepNames[],
      currentStep,
      error,
    }),
    [currentStep, error, isLoading, steps],
  );

  return (
    <companyStepsContext.Provider value={value}>
      {children}
    </companyStepsContext.Provider>
  );
};
