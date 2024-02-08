import { NebuiaStep, NebuiaStepNames } from 'nebuia-ts/models';
import { createContext, useContext } from 'react';

import { PromiseCallback } from '../../../domain/types/ParamCallback';

interface ReportStepsContextValue {
  isLoading: boolean;
  error?: string;
  currentStep?: NebuiaStepNames;
  reportSteps?: NebuiaStep[];
  onNextStep: PromiseCallback<void>;
  loadSteps: PromiseCallback<void>;
}
export const reportStepsContext = createContext<ReportStepsContextValue>(
  {} as ReportStepsContextValue,
);

export const useOptionalReportSteps = (): ReportStepsContextValue | undefined =>
  useContext(reportStepsContext);

export const useReportSteps = (): ReportStepsContextValue =>
  useContext(reportStepsContext);
