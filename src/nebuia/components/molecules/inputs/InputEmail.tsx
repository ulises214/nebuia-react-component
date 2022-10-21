import { FC } from 'react';

import { InputProps, InputWrapper } from './InputWrapper';

export const InputEmail: FC<InputProps> = ({
  action,
  write,
  error = false,
  value,
  placeholder,
  readonly,
  actionDisabled,
  countDown,
}) => {
  return (
    <InputWrapper
      value={value}
      type="email"
      write={write}
      action={action}
      error={error}
      placeholder={placeholder}
      readonly={readonly}
      actionDisabled={actionDisabled}
      countDown={countDown}
    />
  );
};
