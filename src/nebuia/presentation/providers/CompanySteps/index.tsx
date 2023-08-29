import { NebuiaStepNames } from '@nebuia-ts/models';
import { FC, PropsWithChildren, useState } from 'react';

import { useCompanySteps } from '../../hooks/UseCompanySteps';
import { companyStepsContext } from './context';

export const CompanyStepsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, error, steps] = useCompanySteps();
  const [currentStep, setCurrentStep] = useState<NebuiaStepNames>();

  return (
    <companyStepsContext.Provider
      value={{
        isLoading,
        setCurrentStep,
        steps: steps as NebuiaStepNames[],
        currentStep,
        error,
      }}
    >
      {children}
    </companyStepsContext.Provider>
  );
};
