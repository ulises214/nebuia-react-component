import { FC, useCallback, useState } from 'react';

import { CaptureEmailPhoneValue } from './CaptureEmailPhoneValue';
import { VerifyEmailPhoneOtp } from './widgets/VerifyEmailPhoneOtp';

type Props = {
  type: 'email' | 'phone';
};

type Action = 'capture' | 'validate';

export const EmailPhone: FC<Props> = ({ type }) => {
  const [action, setAction] = useState<Action>('capture');
  const [value, setValue] = useState('');
  const onBack = useCallback(() => {
    setValue('');
    setAction('capture');
  }, []);

  if (action === 'capture') {
    return (
      <div className="pt-8">
        <CaptureEmailPhoneValue
          setValue={setValue}
          value={value}
          onContinue={() => setAction('validate')}
          type={type}
        />
      </div>
    );
  }

  return (
    <div className="pt-8">
      <VerifyEmailPhoneOtp type={type} value={value} onBack={onBack} />
    </div>
  );
};
