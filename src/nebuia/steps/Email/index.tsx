import { FC, useCallback, useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { NebuiaApiRepository } from '../../repository/ApiRepository';
import { EmailView } from './view';

export const Email: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const con = useNebuiaStepsContext();
  const [email, setEmail] = useState(con.emailValue ?? '');
  const [code, setCode] = useState('');

  // PhoneNumber
  const [errorEmailNumber, setErrorEmailNumber] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  // Verification code
  const [errorOTP, setErrorOTP] = useState(false);
  const onEmailWrite = useCallback((text: string) => {
    setEmail(text);
    if (!text) {
      setErrorEmailNumber(true);
    }
    const error = !isEmail(text);
    setErrorEmailNumber(error);
    if (error) {
      setErrorEmail('La dirección escrita no es un email');
    }
  }, []);
  const onCodeWrite = useCallback((text: string) => {
    setCode(text);
  }, []);
  // send code
  const sendCode = useCallback(async (): Promise<boolean> => {
    setErrorOTP(false);
    setErrorEmail('');
    setShowPin(false);

    if (!isEmail(email)) {
      setErrorEmailNumber(true);
      setErrorEmail('El email no es válido');

      return false;
    }
    setIsLoading(true);
    const response = await NebuiaApiRepository.saveEmail({
      keys: con.keys,
      report: con.kyc,
      email,
    });
    setIsLoading(false);
    if (!response.status) {
      setErrorEmailNumber(true);
      setErrorEmail(response.payload);

      return false;
    }
    await NebuiaApiRepository.generateOTPCode({
      keys: con.keys,
      report: con.kyc,
      toEmail: true,
    });
    setShowPin(true);

    return true;
  }, [con.keys, con.kyc, email]);
  // verify OTP code
  const verifyCode = useCallback(async () => {
    setIsLoading(true);
    const _response = await NebuiaApiRepository.verifyOTPCode({
      keys: con.keys,
      code,
      report: con.kyc,
      toEmail: true,
    });
    setIsLoading(false);
    setErrorOTP(!_response.status);
    if (!errorOTP) {
      con.finishStep();
    }
  }, [code, con, errorOTP]);

  return (
    <EmailView
      {...{
        email,
        code,
        errorEmail,
        errorEmailNumber,
        errorOTP,
        isLoading,
        onCodeWrite,
        onEmailWrite,
        showPin,
        verifyCode,
        sendCode,
      }}
    />
  );
};
