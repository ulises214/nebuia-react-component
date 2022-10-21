import { FC } from 'react';

import { InputProps, InputWrapper } from './InputWrapper';

export const AddressInput: FC<InputProps> = ({
  write,
  error = false,
  value,
}) => {
  return <InputWrapper value={value} type="text" error={error} write={write} />;
};
