import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../../common/presentation/components/atoms/Loader';
import { P } from '../../../common/presentation/components/atoms/P';
import { H1 } from '../../../common/presentation/components/atoms/titles/H1';
import { HAPPY_GIRL_JUMPING } from '../../../common/presentation/constants/HappyGirlJumping';
import { useControlButton } from '../../../common/presentation/hooks/UseControlButton';
import { useCurrentView } from '../../../common/presentation/providers/CurrentViewProvider/Context';
import { useNebuiaSdk } from '../hooks/UseRepository';
import { useCompanySteps } from '../providers/CompanySteps/context';
import { useReportSteps } from '../providers/ReportSteps/Context';
import { StepsView } from './StepView';

export const SignatureWelcomePage = () => {
  const { setCurrentView } = useCurrentView();
  const { steps, isLoading, error } = useCompanySteps();
  const { loadSteps } = useReportSteps();
  const sdk = useNebuiaSdk();
  const { t } = useTranslation();
  const onNext = useCallback(async () => {
    const report = sdk.getReport(true);
    if (!report) {
      await sdk.createReport();
    }
    await loadSteps();
    setCurrentView(<StepsView />);
  }, [loadSteps, sdk, setCurrentView]);

  useControlButton({
    action: onNext,
    label: t('pages.genericWelcome.startButton'),
    side: 'next',
    active: !!steps,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <figure>
        <img src={HAPPY_GIRL_JUMPING} alt="" className="w-full max-w-[27rem]" />
      </figure>
      <H1>{t('pages.signatureWelcome.title')}</H1>
      <P className="text-center">{t('pages.signatureWelcome.description')}</P>
    </div>
  );
};
