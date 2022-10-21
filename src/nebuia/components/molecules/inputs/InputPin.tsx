import { FC } from 'react';

import { InputProps, InputWrapper } from './InputWrapper';

export const InputPin: FC<InputProps> = ({ action, write, value }) => {
  return (
    <InputWrapper
      value={value}
      placeholder="Ingresa código OTP"
      type="number"
      write={write}
      action={action}
    />
  );
};
