import { Loader } from '@components/atoms/Loader';
import { P } from '@components/atoms/P';
import { H1 } from '@components/atoms/titles/H1';
import { Alert } from '@components/molecules/Alert';
import {
  useCreditsCompanyContext,
  useCreditsStepContext,
} from '@nebuia-services/credits/context/credits-context';
import { NebuiaCompany } from 'nebuia-ts/models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HAPPY_GIRL_JUMPING } from '../../../../../common/presentation/constants/HappyGirlJumping';
import { useControlButton } from '../../../../../common/presentation/hooks/UseControlButton';
import { useNebuiaSdk } from '../../../../../nebuia/presentation/hooks/UseRepository';

type Status =
  | { loading: true }
  | { error: string }
  | { success: NebuiaCompany['settings'] };
export const WelcomeCreditEnrollment = () => {
  const sdk = useNebuiaSdk();
  const { onNextStep } = useCreditsStepContext();
  const { setCompany } = useCreditsCompanyContext();
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>({ loading: true });

  useEffect(() => {
    if ('success' in status) {
      setCompany(status.success);
    }
  }, [setCompany, status]);

  useEffect(() => {
    void init();
    async function init() {
      const response = await sdk.getCompanySettings();
      if (response.status) {
        setStatus({ success: response.payload });
      } else {
        setStatus({ error: response.payload });
      }
    }
  }, [sdk]);

  useControlButton({
    action: onNextStep,
    label: t('pages.genericWelcome.startButton'),
    side: 'next',
    active: 'success' in status,
  });

  if ('loading' in status) {
    return <Loader />;
  }
  if ('error' in status) {
    return <Alert variant="error" message={status.error} />;
  }

  return (
    <div className="flex flex-col items-center">
      <figure>
        <img src={HAPPY_GIRL_JUMPING} alt="" className="w-full max-w-[27rem]" />
      </figure>
      <H1>{t('services.credit.instructions.title')}</H1>
      <P className="text-center">{t('services.credit.instructions.message')}</P>
    </div>
  );
};
