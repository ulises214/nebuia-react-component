import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../../common/presentation/components/atoms/buttons/Button';
import { Loader } from '../../../../../common/presentation/components/atoms/Loader';
import { P } from '../../../../../common/presentation/components/atoms/P';
import { useSendOtp } from '../../../hooks/UseSendOtp';

type Props = {
  type: 'email' | 'phone';
  onRequested?: () => void;
};
export const ResendOtp: FC<Props> = ({ type, onRequested }) => {
  const [loading, , resend] = useSendOtp({ type, onRequested });
  const { t } = useTranslation();

  if (loading) {
    return <Loader />;
  }

  return (
    <P className="text-sm">
      {t('pages.emailPhone.otpSent.resendOtp.ask')}{' '}
      <Button extraSmall variant="text" onClick={resend}>
        {t('pages.emailPhone.otpSent.resendOtp.button')}
      </Button>
    </P>
  );
};
