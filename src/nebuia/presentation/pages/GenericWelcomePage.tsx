import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { updateUrl } from '../../../common/domain/utils/updateUrl';
import { Loader } from '../../../common/presentation/components/atoms/Loader';
import { P } from '../../../common/presentation/components/atoms/P';
import { H1 } from '../../../common/presentation/components/atoms/titles/H1';
import { HAPPY_GIRL_JUMPING } from '../../../common/presentation/constants/HappyGirlJumping';
import { useControlButton } from '../../../common/presentation/hooks/UseControlButton';
import { useNebuiaSdk } from '../hooks/UseRepository';
import { useCompanySteps } from '../providers/CompanySteps/context';
import { useReportSteps } from '../providers/ReportSteps/Context';

export const GenericWelcomePage = () => {
  const { steps, isLoading, error } = useCompanySteps();
  const sdk = useNebuiaSdk();
  const { t } = useTranslation();
  const { loadSteps } = useReportSteps();

  const onNext = useCallback(async () => {
    const report = sdk.getReport(true);
    if (!report) {
      await sdk.createReport();
      updateUrl('report', sdk.getReport());
    }
    await loadSteps();
  }, [loadSteps, sdk]);

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
      <H1>{t('pages.genericWelcome.title')}</H1>
      <P className="text-center">{t('pages.genericWelcome.description')}</P>
    </div>
  );
};
