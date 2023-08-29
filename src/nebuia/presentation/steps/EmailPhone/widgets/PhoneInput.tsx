import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { phone, PhoneResult } from 'phone';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useWidgetConfig } from '../../../providers/WidgetConfig/Context';
import { CommonProps, Input } from './Input';

export const PhoneInput: FC<CommonProps> = ({ value, onContinue }) => {
  const { initialPhone } = useWidgetConfig();
  const [result, setResult] = useState<PhoneResult>();
  const validate = useCallback((value: string) => {
    const result = phone(value);
    setResult(result);

    return result.isValid;
  }, []);

  useEffect(() => {
    initialPhone && validate(initialPhone);
  }, [initialPhone, validate]);

  const flag = useMemo(() => {
    if (!result?.countryIso2) {
      return;
    }

    return getUnicodeFlagIcon(result.countryIso2);
  }, [result?.countryIso2]);

  const handleContinue = useCallback(() => {
    if (!result?.isValid) {
      return;
    }
    onContinue(result.phoneNumber);
  }, [onContinue, result]);

  return (
    <Input
      initialValue={initialPhone}
      onContinue={handleContinue}
      value={result?.phoneNumber ?? value}
      type="phone"
      validator={validate}
      prefix={flag}
      requiresPrefix
    />
  );
};
