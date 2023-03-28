import { FC, useCallback, useState } from 'react';
import validator from 'validator';

import { OnInputChange } from '../../components/molecules';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { NebuiaApiRepository } from '../../repository/ApiRepository';
import { PhoneView } from './view';

export const Phone: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const con = useNebuiaStepsContext();

  const [phone, setPhone] = useState(con.phoneValue ?? '');
  const [code, setCode] = useState('');

  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorPhone, setErrorPhone] = useState('');
  const [errorOTP, setErrorOTP] = useState(false);
  const onPhoneWrite = useCallback<OnInputChange>((text) => {
    setPhone(text);
    if (!text) {
      setErrorPhoneNumber(true);

      return;
    }
    const error = !validator.isMobilePhone(text, 'es-MX');
    setErrorPhoneNumber(error);
    if (error) {
      setErrorPhone('Por favor escribe solo números');
    }
    if (text.length > 10) {
      setErrorPhone('La longitud máxima son 10 números');
      setErrorPhoneNumber(true);
    }
  }, []);

  const onCodeWrite = useCallback<OnInputChange>((text) => {
    setCode(text);
  }, []);
  const sendCode = useCallback(async (): Promise<boolean> => {
    setErrorOTP(false);
    setErrorPhone('');
    setShowPin(false);
    setErrorPhoneNumber(false);
    if (!validator.isMobilePhone(phone, 'es-MX')) {
      setErrorPhoneNumber(true);
      setErrorPhone('El número de teléfono no es válido');

      return false;
    }
    setIsLoading(true);
    const response = await NebuiaApiRepository.savePhoneNumber({
      keys: con.keys,
      report: con.kyc,
      phone,
    });
    if (!response.status) {
      return false;
    }
    await NebuiaApiRepository.generateOTPCode({
      keys: con.keys,
      report: con.kyc,
      toEmail: false,
    });
    setIsLoading(false);
    setShowPin(true);

    return true;
  }, [con.keys, con.kyc, phone]);

  const verifyCode = useCallback(async () => {
    setIsLoading(true);
    const _response = await NebuiaApiRepository.verifyOTPCode({
      code,
      keys: con.keys,
      report: con.kyc,
      toEmail: false,
    });
    setIsLoading(false);
    const error = !_response.status;
    setErrorOTP(error);
    if (!error) {
      con.finishStep();
    }
  }, [code, con]);

  return (
    <PhoneView
      {...{
        showPin,
        phone,
        code,
        errorPhoneNumber,
        errorPhone,
        errorOTP,
        onPhoneWrite,
        onCodeWrite,
        sendCode,
        verifyCode,
        isLoading,
      }}
    ></PhoneView>
  );
};
