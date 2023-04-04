import { FC } from 'react';
import validator from 'validator';

import Button from '../../../components/atoms/buttons/Button';
import { LoaderIndicator, P, SizedBox } from '../../components/atoms';
import { InputEmail, InputPhone, InputPin } from '../../components/molecules';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { useOtpCodeInput } from './index';

const validatePhone = (phone?: string) => {
  const valid = validator.isMobilePhone(phone ?? '', 'es-MX');

  if (valid) {
    return;
  }

  return 'El número de teléfono no es válido';
};

const validateEmail = (email?: string) => {
  const valid = validator.isEmail(email ?? '');

  if (valid) {
    return;
  }

  return 'El correo electrónico no es válido';
};

export const EmailPhone: FC<{ type: 'email' | 'phone' }> = ({ type }) => {
  const {
    countDown,
    isLoading,
    onChange,
    onOtpChange,
    otp,
    requested,
    saveOtp,
    saveValue,
    showPin,
    value,
    apiError,
    otpError,
    valueError,
  } = useOtpCodeInput({
    type,
    validator: type === 'email' ? validateEmail : validatePhone,
  });

  const con = useNebuiaStepsContext();

  const Input = type === 'email' ? InputEmail : InputPhone;

  const defaultValue = type === 'email' ? con.emailValue : con.phoneValue;

  return (
    <>
      <SizedBox height="s15" />
      <P center>
        Enviaremos un código de verificación a tu{' '}
        {type === 'email'
          ? 'dirección de correo electrónico'
          : 'número de teléfono'}
        .
      </P>
      <SizedBox height="s35" />
      <P center>
        {type === 'email' ? 'Correo electrónico' : 'Número de teléfono'}
      </P>
      <SizedBox height="s5" />
      <Input
        readonly={isLoading || !!defaultValue}
        value={defaultValue ?? value}
        action={saveValue}
        error={!!valueError}
        write={onChange}
        actionDisabled={requested}
        countDown={countDown}
      />
      {valueError && (
        <>
          <SizedBox height="s5" />
          <P secondary>{valueError}</P>
        </>
      )}
      <SizedBox height="s10" />
      {showPin && <InputPin value={otp} write={onOtpChange} />}
      {otpError && (
        <>
          <SizedBox height="s5" />
          <P secondary>{otpError}</P>
        </>
      )}
      <SizedBox height="s10" />
      {showPin && (
        <div>
          <Button
            disabled={isLoading || !!otpError}
            isLoading={isLoading}
            variant="primary"
            onClick={saveOtp}
          >
            Verificar
          </Button>
        </div>
      )}
      {isLoading && !showPin && (
        <>
          <SizedBox height="s5" />
          <LoaderIndicator />
        </>
      )}
      {!!apiError && (
        <>
          <SizedBox height="s5" />
          <P secondary>
            {(() => {
              if (apiError === 'invalid code') {
                return 'El código OTP no es correcto';
              }

              return apiError;
            })()}
          </P>
        </>
      )}
    </>
  );
};
