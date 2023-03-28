import { FC } from 'react';
import validator from 'validator';

import Button from '../../../components/atoms/buttons/Button';
import { H1, LoaderIndicator, P, SizedBox } from '../../components/atoms';
import { InputEmail, InputPin } from '../../components/molecules';
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

  return (
    <div className="flex flex-col items-center">
      <SizedBox height="s35" />
      <H1 center>
        Verifica tu{' '}
        {type === 'email' ? 'correo electrónico' : 'número de teléfono'}
      </H1>
      <SizedBox height="s15" />
      <P bold center>
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
      <InputEmail
        readonly={isLoading || !!con.emailValue}
        value={con.emailValue ?? value}
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
          <Button isLoading={isLoading} variant="primary" onClick={saveOtp}>
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
    </div>
  );
};
