import { FC } from 'react';

import Button from '../../../components/atoms/buttons/Button';
import { ValueCallback, VoidCallback } from '../../../lib/common/VoidCallback';
import { H1, LoaderIndicator, P, SizedBox } from '../../components/atoms';
import {
  InputPhone,
  InputPin,
  OnInputChange,
} from '../../components/molecules';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { useRequestCountDown } from '../../hooks/useRequestCountDown';

type PhoneViewProps = {
  isLoading: boolean;
  showPin: boolean;
  phone: string;
  code: string;
  errorPhoneNumber: boolean;
  errorPhone: string;
  errorOTP: boolean;
  onPhoneWrite: OnInputChange;
  onCodeWrite: OnInputChange;
  sendCode: ValueCallback<Promise<boolean>>;
  verifyCode: VoidCallback;
};
export const PhoneView: FC<PhoneViewProps> = ({
  isLoading,
  code,
  errorOTP,
  errorPhone,
  errorPhoneNumber,
  onCodeWrite,
  onPhoneWrite,
  phone,
  sendCode,
  showPin,
  verifyCode,
}) => {
  const con = useNebuiaStepsContext();
  const { setRequested, requested, countDown } = useRequestCountDown();
  const handleClick = async () => {
    setRequested(true);
    const canSendPhone = await sendCode();

    if (!canSendPhone) {
      setRequested(false);
    }
  };

  return (
    <div className="scroll-style flex flex-col items-center overflow-y-auto">
      <SizedBox height="s35" />
      <H1 center>Verifica tu número de teléfono</H1>
      <SizedBox height="s15" />
      <P center>Enviaremos un código de verificación a tu número celular.</P>
      <SizedBox height="s35" />
      <P bold center>
        Número de teléfono
      </P>
      <SizedBox height="s5" />
      <InputPhone
        readonly={isLoading || !!con.phoneValue}
        value={phone}
        action={() => void handleClick()}
        error={errorPhoneNumber}
        write={onPhoneWrite}
        actionDisabled={requested}
        countDown={countDown}
      />
      {errorPhoneNumber && (
        <>
          <SizedBox height="s5" />
          <P secondary>{errorPhone}</P>
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
        <div className="mx-auto">
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
