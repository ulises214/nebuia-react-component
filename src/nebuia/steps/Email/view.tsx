import { FC } from 'react';

import { ValueCallback, VoidCallback } from '../../../lib/common/VoidCallback';
import Button from '../../../lib/components/atoms/buttons/Button';
import { H1, LoaderIndicator, P, SizedBox } from '../../components/atoms';
import {
  InputEmail,
  InputPin,
  OnInputChange,
} from '../../components/molecules';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { useRequestCountDown } from '../../hooks/useRequestCountDown';

type EmailViewProps = {
  email: string;
  code: string;
  sendCode: ValueCallback<Promise<boolean>>;
  errorEmailNumber: boolean;
  onEmailWrite: OnInputChange;
  errorEmail: string;
  showPin: boolean;
  onCodeWrite: OnInputChange;
  errorOTP: boolean;
  isLoading: boolean;
  verifyCode: VoidCallback;
};

export const EmailView: FC<EmailViewProps> = ({
  code,
  email,
  sendCode,
  errorEmail,
  errorEmailNumber,
  errorOTP,
  isLoading,
  onCodeWrite,
  onEmailWrite,
  showPin,
  verifyCode,
}) => {
  const con = useNebuiaStepsContext();
  const { setRequested, requested, countDown } = useRequestCountDown();
  const handleClick = async () => {
    setRequested(true);
    const canSendEmail = await sendCode();

    if (!canSendEmail) {
      setRequested(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <SizedBox height="s35" />
      <H1 center>Verifica tu email</H1>
      <SizedBox height="s15" />
      <P bold center>
        Enviaremos un código de verificación a tu dirección de correo
        electrónico.
      </P>
      <SizedBox height="s35" />
      <P center>Correo electrónico</P>
      <SizedBox height="s5" />
      <InputEmail
        readonly={isLoading || !!con.emailValue}
        value={con.emailValue ?? email}
        action={() => void handleClick()}
        error={errorEmailNumber}
        write={onEmailWrite}
        actionDisabled={requested}
        countDown={countDown}
      />
      {errorEmailNumber && (
        <>
          <SizedBox height="s5" />
          <P secondary>{errorEmail}</P>
        </>
      )}
      <SizedBox height="s10" />
      {showPin && <InputPin value={code} write={onCodeWrite} />}
      {errorOTP && (
        <>
          <SizedBox height="s5" />
          <P secondary>El código OTP no es correcto</P>
        </>
      )}
      <SizedBox height="s10" />
      {showPin && (
        <div>
          <Button
            isLoading={isLoading}
            variant="primary"
            onClick={() => void verifyCode()}
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
    </div>
  );
};
