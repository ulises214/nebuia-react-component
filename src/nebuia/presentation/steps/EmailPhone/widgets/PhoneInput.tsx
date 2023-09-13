import { isValidPhoneNumber } from 'libphonenumber-js';
import { FC, useCallback, useEffect, useState } from 'react';
import {} from 'react-phone-input-2';

import { useWidgetConfig } from '../../../providers/WidgetConfig/Context';
import { CommonProps, Input } from './Input';

export const PhoneInput: FC<CommonProps> = ({ value, onContinue }) => {
  const { initialPhone } = useWidgetConfig();
  const [result, setResult] = useState<{ isValid: boolean; phone: string }>();
  const validate = useCallback((value: string) => {
    const parsed = value.startsWith('+') ? value : `+${value}`;
    const result = isValidPhoneNumber(parsed);

    setResult({
      isValid: result,
      phone: result ? value : '',
    });

    return result;
  }, []);

  useEffect(() => {
    initialPhone && validate(initialPhone);
  }, [initialPhone, validate]);

  const handleContinue = useCallback(() => {
    if (!result?.isValid) {
      return;
    }
    onContinue(result.phone);
  }, [onContinue, result]);

  return (
    <Input
      initialValue={initialPhone}
      onContinue={handleContinue}
      value={result?.phone ?? value}
      type="phone"
      validator={validate}
    />
  );
};
