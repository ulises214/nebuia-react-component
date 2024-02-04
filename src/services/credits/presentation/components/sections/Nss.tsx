import Button from '@components/atoms/buttons/Button';
import { InputWithLabel } from '@components/molecules/inputs/InputWithLabel';
import {
  useCreditsEnrollmentInfoContext,
  useCreditsStepContext,
} from '@nebuia-services/credits/context/credits-context';
import { isNSS } from '@nebuia-services/utils/is-nss';
import { useState } from 'react';

import { SectionWrapper } from '../SectionWrapper';

export const NssCreditEnrollment = () => {
  const [nss, setSss] = useState('');
  const { onNextStep } = useCreditsStepContext();

  const { setData } = useCreditsEnrollmentInfoContext();
  const [error, setError] = useState<string>();

  const validate = (nss: string) => {
    const valid = isNSS(nss);
    if (!valid) {
      setError('El NSS no es válido');

      return false;
    }
    setError(undefined);

    return true;
  };

  const onChange = (value: string) => {
    validate(value);
    setSss(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = validate(nss);
    if (!valid) {
      return;
    }

    setData({ nss });
    onNextStep();
  };

  return (
    <SectionWrapper>
      <form onSubmit={onSubmit}>
        <InputWithLabel
          autoComplete
          id="nss"
          label="Nss"
          type="text"
          value={nss}
          onChange={onChange}
          errorMessage={error}
          required
          button={
            <Button
              variant="primary"
              type="submit"
              className="!py-1.5"
              disabled={!!error}
            >
              Enviar
            </Button>
          }
        />
      </form>
    </SectionWrapper>
  );
};
