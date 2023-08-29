import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../../../../common/presentation/components/atoms/Loader';
import { P } from '../../../../../common/presentation/components/atoms/P';
import { Alert } from '../../../../../common/presentation/components/molecules/Alert';
import { useControlButton } from '../../../../../common/presentation/hooks/UseControlButton';
import { useVerifyOtp } from '../../../hooks/UseVerifyOtp';
import { useReportSteps } from '../../../providers/ReportSteps/Context';
import { OtpInput } from './OtpInput';
import { ResendOtp } from './ResendOtp';

export const VerifyEmailPhoneOtp: FC<{
  type: 'email' | 'phone';
  value: string;
  onBack: VoidFunction;
}> = ({ onBack, type, value }) => {
  const [otp, setOtp] = useState('');
  const { onNextStep } = useReportSteps();

  const { t } = useTranslation();
  const [loading, error, result] = useVerifyOtp({
    type,
    otp,
  });

  const isValidOtp = useMemo(() => otp.length === 6 && /\d+/.test(otp), [otp]);

  const handleNext = useCallback(async () => {
    if (!isValidOtp) {
      return;
    }
    if (!result?.result) {
      await result?.send();

      return;
    }
    await onNextStep();
  }, [isValidOtp, onNextStep, result]);
  const nextLabel = useMemo(() => {
    if (!result?.result) {
      return t('pages.emailPhone.otpSent.verify');
    }

    return t('common.continue');
  }, [result?.result, t]);
  const isNextAllowed = useMemo(() => {
    if (!isValidOtp) {
      return false;
    }
    if (loading) {
      return false;
    }

    return true;
  }, [isValidOtp, loading]);

  useControlButton({
    action: onBack,
    label: t('common.retryProcess'),
    side: 'previous',
    active: !loading,
  });

  useControlButton({
    action: handleNext,
    label: nextLabel,
    side: 'next',
    active: isNextAllowed,
  });

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="space-y-2">
        <P className="text-center text-2xl font-bold">
          {t('pages.emailPhone.otpSent.title')}
        </P>
        <P className="w-full max-w-lg text-center">
          {t(`pages.emailPhone.otpSent.description.${type}`)}{' '}
          <span className="font-bold">{value}</span>
        </P>
      </div>
      <OtpInput
        onChange={setOtp}
        readonly={!!result?.result || loading}
        value={otp}
      />
      {!loading && !result?.result && (
        <ResendOtp
          type={type}
          onRequested={() => {
            result?.clearError();
            setOtp('');
          }}
        />
      )}
      {loading && <Loader />}
      {result?.result && (
        <Alert
          variant="success"
          title={t('pages.emailPhone.otpSent.success.title')}
          message={t('pages.emailPhone.otpSent.success.description')}
        />
      )}
      {error && (
        <Alert
          variant="error"
          title={t('pages.emailPhone.otpSent.error.title')}
          message={t('pages.emailPhone.otpSent.error.description')}
        />
      )}
    </div>
  );
};
