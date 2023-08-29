import { NebuiaStepNames } from '@nebuia-ts/models';
import { createContext, useContext } from 'react';

type CompanyStepsContext = {
  setCurrentStep: (step: NebuiaStepNames) => void;
  currentStep?: NebuiaStepNames;
  isLoading: boolean;
  error?: string;
  steps?: NebuiaStepNames[];
};
export const companyStepsContext = createContext({} as CompanyStepsContext);

export const useCompanySteps = (): CompanyStepsContext =>
  useContext(companyStepsContext);
export const useOptionalCompanySteps = (): CompanyStepsContext | undefined =>
  useContext(companyStepsContext);
