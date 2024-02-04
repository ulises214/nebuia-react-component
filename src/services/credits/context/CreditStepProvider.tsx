import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { useCurrentView } from '../../../common/presentation/providers/CurrentViewProvider/Context';
import { CreditsStepContext, stepContext } from './credits-context';

export const CreditsStepProvider: FC<PropsWithChildren> = ({ children }) => {
  const [step, setStep] = useState<CreditsStepContext['step']>('welcome');
  const { setCurrentView } = useCurrentView();

  const onNextStep = useCallback(() => {
    let next: CreditsStepContext['step'] | undefined = undefined;
    step === 'welcome' && (next = 'nss');
    step === 'nss' && (next = 'documents');
    step === 'documents' && (next = 'finish');
    step === 'finish' && setCurrentView('details');
    next && setStep(next);
  }, [setCurrentView, step]);

  const onPrevStep = useCallback(() => {
    let prev: CreditsStepContext['step'] | undefined = undefined;
    step === 'nss' && (prev = 'welcome');
    step === 'documents' && (prev = 'nss');
    prev && setStep(prev);
  }, [step]);

  const value = useMemo<CreditsStepContext>(() => {
    return {
      step,
      onNextStep,
      onPreviousStep: onPrevStep,
    };
  }, [onNextStep, onPrevStep, step]);

  return <stepContext.Provider value={value}>{children}</stepContext.Provider>;
};
