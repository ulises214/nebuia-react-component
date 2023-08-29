import isEmail from 'email-validator';
import { FC } from 'react';

import { useWidgetConfig } from '../../../providers/WidgetConfig/Context';
import { CommonProps, Input } from './Input';

const validateEmail = (value?: string) => {
  return isEmail.validate(value ?? '');
};

export const EmailInput: FC<CommonProps> = ({ value, onContinue }) => {
  const { initialEmail } = useWidgetConfig();

  return (
    <Input
      initialValue={initialEmail}
      onContinue={onContinue}
      value={value}
      type="email"
      validator={validateEmail}
    />
  );
};
