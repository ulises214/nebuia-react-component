import { NebuiaStep, NebuiaStepNames } from '@nebuia-ts/models';
import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorKeys } from '../../../../common/domain/errors_keys';
import { useCurrentView } from '../../../../common/presentation/providers/CurrentViewProvider/Context';
import { useNebuiaSdk } from '../../hooks/UseRepository';
import { useWidgetConfig } from '../WidgetConfig/Context';
import { reportStepsContext } from './Context';

export const ReportStepsProvider: FC<PropsWithChildren> = ({ children }) => {
  const sdk = useNebuiaSdk();
  const { withDetailsPage, onFinished, reportType } = useWidgetConfig();
  const [reportSteps, setReportSteps] = useState<NebuiaStep[]>();
  const [currentStep, setCurrentStep] = useState<NebuiaStepNames>();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentView } = useCurrentView();
  const { t } = useTranslation();
  const [error, setError] = useState<string>();

  const loadSteps = useCallback(async () => {
    setIsLoading(true);
    const res = await sdk.getStepsFromReport();
    setIsLoading(false);
    if (!res.status) {
      const errorKey = ErrorKeys[res.payload];
      setError(errorKey ? t(`errors.${errorKey}`) : res.payload);

      return;
    }
    setReportSteps(res.payload);
    const firstStep = res.payload.find((step) => !step.status);
    if (firstStep) {
      setCurrentStep(firstStep.name);
      setCurrentView('steps');

      return;
    }
    if (reportType !== 'KYC') {
      reportType === 'SIGNATURE' && setCurrentView('signature');
      reportType === 'CREDITS_ENROLLMENT' &&
        setCurrentView('credits_enrollment');

      return;
    }
    if (withDetailsPage) {
      setCurrentView('details');

      return;
    }

    await onFinished(sdk.getReport());
  }, [onFinished, reportType, sdk, setCurrentView, t, withDetailsPage]);

  const onNextStep = useCallback(async () => {
    const currIndex = reportSteps?.findIndex(
      (step) => step.name === currentStep,
    );
    if (currIndex === undefined || currIndex === -1 || !reportSteps) {
      return;
    }
    // nextStep with completed: false
    const nextStep = reportSteps.find(
      (step, index) => index > currIndex && !step.status,
    );

    if (nextStep) {
      setCurrentStep(nextStep.name);

      return;
    }
    if (reportType !== 'KYC') {
      reportType === 'SIGNATURE' && setCurrentView('signature');
      reportType === 'CREDITS_ENROLLMENT' &&
        setCurrentView('credits_enrollment');

      return;
    }
    if (withDetailsPage) {
      setCurrentView('details');

      return;
    }

    await onFinished(sdk.getReport());
  }, [
    currentStep,
    onFinished,
    reportSteps,
    reportType,
    sdk,
    setCurrentView,
    withDetailsPage,
  ]);

  const value = useMemo(
    () => ({
      loadSteps,
      isLoading,
      reportSteps,
      currentStep,
      error,
      onNextStep,
    }),
    [currentStep, error, isLoading, loadSteps, onNextStep, reportSteps],
  );

  return (
    <reportStepsContext.Provider value={value}>
      {children}
    </reportStepsContext.Provider>
  );
};
