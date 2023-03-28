import { useCallback, useState } from 'react';

import { Optional } from '../../../lib/common/Optional';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { useRequestCountDown } from '../../hooks/useRequestCountDown';
import { NebuiaApiRepository } from '../../repository/ApiRepository';

type OtpCodeInputProps = {
  type: 'email' | 'phone';
  validator: (value?: string) => string | undefined;
};
type OtpCodeInput = {
  value: string;
  otp: string;

  valueError?: string;
  otpError?: string;
  apiError?: string;

  showPin: boolean;

  isLoading: boolean;

  onChange: (value: string) => void;
  onOtpChange: (otp: string) => void;

  saveValue: () => void;
  saveOtp: () => void;

  countDown: Optional<number>;
  requested: boolean;
};
export const useOtpCodeInput = (props: OtpCodeInputProps): OtpCodeInput => {
  const { type, validator } = props;

  const { setRequested, requested, countDown } = useRequestCountDown();

  const { emailValue, phoneValue, keys, kyc, finishStep } =
    useNebuiaStepsContext();

  const [value, setValue] = useState(
    type === 'email' ? emailValue ?? '' : phoneValue ?? '',
  );
  const [otp, setOtp] = useState('');

  const [valueError, setValueError] = useState<string>();
  const [otpError, setOtpError] = useState<string>();
  const [apiError, setApiError] = useState<string>();

  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetErrors = useCallback(() => {
    setValueError(undefined);
    setOtpError(undefined);
    setApiError(undefined);
  }, []);

  const validateValue = useCallback(
    (value: string | undefined) => {
      const error = validator(value);
      setValueError(error);

      return error;
    },
    [validator],
  );
  const validateOtp = useCallback((otp?: string) => {
    if (!otp) {
      setOtpError('El código es requerido');

      return false;
    }
    if (otp.length !== 6) {
      setOtpError('El código debe tener 6 dígitos');

      return false;
    }
    setOtpError(undefined);

    return true;
  }, []);

  const onChange = useCallback(
    (value: string) => {
      validateValue(value);
      setValue(value);
      setShowPin(false);
    },
    [validateValue],
  );

  const onOtpChange = useCallback(
    (otp: string) => {
      setOtp(otp);
      validateOtp(otp);
    },
    [validateOtp],
  );

  const saveValue = useCallback(async () => {
    if (isLoading) {
      return;
    }
    if (validateValue(value)) {
      return;
    }

    resetErrors();

    setShowPin(true);

    setIsLoading(true);
    const response = await NebuiaApiRepository.saveEmailPhone({
      keys,
      report: kyc,
      toEmail: type === 'email',
      value,
    });
    setIsLoading(false);

    if (!response.status) {
      setApiError(response.payload);

      return;
    }
    setRequested(true);

    await NebuiaApiRepository.generateOTPCode({
      keys,
      report: kyc,
      toEmail: type === 'email',
    });
  }, [
    isLoading,
    keys,
    kyc,
    resetErrors,
    setRequested,
    type,
    validateValue,
    value,
  ]);

  const saveOtp = useCallback(async () => {
    if (isLoading) {
      return;
    }
    if (!validateOtp(otp)) {
      return;
    }

    resetErrors();

    setIsLoading(true);
    const response = await NebuiaApiRepository.verifyOTPCode({
      keys,
      report: kyc,
      toEmail: type === 'email',
      code: otp,
    });
    setIsLoading(false);

    if (!response.status) {
      setApiError(response.payload);

      return;
    }

    finishStep();
  }, [finishStep, isLoading, keys, kyc, otp, resetErrors, type, validateOtp]);

  return {
    value,
    otp,

    valueError,
    otpError,
    apiError,

    showPin,

    isLoading,

    onChange,
    onOtpChange,
    saveValue: () => void saveValue(),
    saveOtp: () => void saveOtp(),
    countDown,
    requested,
  };
};
