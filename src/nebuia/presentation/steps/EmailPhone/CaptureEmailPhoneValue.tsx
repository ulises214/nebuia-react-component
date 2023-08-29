import { FC, useCallback } from 'react';

import { EmailInput } from './widgets/EmailInput';
import { PhoneInput } from './widgets/PhoneInput';

type Props = {
  type: 'email' | 'phone';
  onContinue: VoidFunction;
  value: string;
  setValue: (value: string) => void;
};
export const CaptureEmailPhoneValue: FC<Props> = ({
  onContinue,
  type,
  setValue,
  value,
}) => {
  const handleContinue = useCallback(
    (value: string) => {
      setValue(value);
      onContinue();
    },
    [onContinue, setValue],
  );
  if (type === 'email') {
    return <EmailInput onContinue={handleContinue} value={value} key="email" />;
  }

  return <PhoneInput onContinue={handleContinue} value={value} key="phone" />;
};
