import Button from '@components/atoms/buttons/Button';
import { Loader } from '@components/atoms/Loader';
import { P } from '@components/atoms/P';
import { Alert } from '@components/molecules/Alert';
import { useCreditsEnrollmentInfoContext } from '@nebuia-services/credits/context/credits-context';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HAPPY_GIRL_JUMPING } from '../../../../../common/presentation/constants/HappyGirlJumping';
import { useControlButton } from '../../../../../common/presentation/hooks/UseControlButton';
import { useCurrentView } from '../../../../../common/presentation/providers/CurrentViewProvider/Context';
import { useCreditsEnrollment } from '../../../../../nebuia/presentation/hooks/UseRepository';
import { SectionWrapper } from '../SectionWrapper';

type Status = { loading: true } | { success: true } | { error: string };
export const FinishCreditsEnrollment: FC = () => {
  const [status, setStatus] = useState<Status>({ loading: true });
  const { setCurrentView } = useCurrentView();
  const info = useCreditsEnrollmentInfoContext();
  const { t } = useTranslation();
  const sdk = useCreditsEnrollment();

  const finish = useCallback(async () => {
    setStatus({ loading: true });
    const body = {
      nss: info.data.nss,
      files: info.data.files,
    };
    const result = await sdk.creditsEnrollmentUploadDocuments(body);
    if (!result.status) {
      setStatus({ error: result.payload });

      return;
    }

    setStatus({ success: true });
  }, [info.data.files, info.data.nss, sdk]);

  useEffect(() => {
    void finish();
  }, [finish]);

  const onContinue = useCallback(() => {
    setCurrentView('details');
  }, [setCurrentView]);

  useControlButton({
    side: 'next',
    action: onContinue,
    label: t('common.continue'),
    active: 'success' in status,
  });
  const getT = (() => {
    const base = (step: string) => ({
      title: t(`services.credit.finish.${step}.title`),
      message: t(`services.credit.finish.${step}.message`),
    });
    if ('success' in status) {
      return base('success');
    }
    if ('error' in status) {
      return base('error');
    }

    return base('loading');
  })();

  return (
    <SectionWrapper>
      {('loading' in status || 'success' in status) && (
        <div className="space-y-1">
          <P className="font-bold text-lg">{getT.title}</P>
          <P className="text-sm">{getT.message}</P>
        </div>
      )}
      {'error' in status && (
        <Alert
          variant="error"
          title={getT.title}
          message={[getT.message, status.error]}
        />
      )}
      {'success' in status && (
        <div className="flex justify-center items-center">
          <img
            src={HAPPY_GIRL_JUMPING}
            alt=""
            className="w-full max-w-[18rem]"
          />
        </div>
      )}
      {'loading' in status && <Loader />}
      {'error' in status && (
        <div className="flex justify-center">
          <Button variant="primary" onClick={() => void finish()}>
            {t('common.retry')}
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
};
