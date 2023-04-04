import { FC } from 'react';

import { Layout } from '../components/layout';
import NextImage from '../components/molecules/NextImage';
import { LoaderIndicator } from './components/atoms';
import { NebuiaStepsInstructions } from './components/organisms/NebuiaStepsInstructions';
import {
  NebuiaStepsContextProvider,
  NebuiaStepsContextProviderProps,
  useNebuiaStepsContext,
} from './context/NebuiaStepsContext';
import { NebuiaStepsDocumentContextProvider } from './context/NebuiaStepsDocumentContext';
import { ThemeProvider } from './context/NebuiaThemeContext';
import { CompleteStep } from './models/CompleteStep';
import { Address } from './steps/Address';
import { EmailPhone } from './steps/EmailPhone/view';
import { Selection } from './steps/id/Selection';
import { FaceInstruction } from './steps/liveness/Instructions';

const getStep = (step: CompleteStep): [JSX.Element, string] => {
  if (step.name === 'email') {
    return [
      <EmailPhone type="email" key={step.name} />,
      'Verifica tu correo electrónico',
    ];
  }
  if (step.name === 'phone') {
    return [
      <EmailPhone type="phone" key={step.name} />,
      'Verifica tu número de teléfono',
    ];
  }
  if (step.name === 'id') {
    return [<Selection key={step.name} />, 'Verifica tu identificación'];
  }
  if (step.name === 'liveness') {
    return [<FaceInstruction key={step.name} />, 'Verifica tu prueba de vida'];
  }

  return [<Address key={step.name} />, 'Verifica tu domicilio'];
};
export const Content: FC = () => {
  const { changeView, loading, steps, view } = useNebuiaStepsContext();
  if (loading) {
    return <LoaderIndicator />;
  }
  if (!steps) {
    return <div>No hay pasos para realizar</div>;
  }
  if (view) {
    return view;
  }

  return (
    <NebuiaStepsInstructions
      onStepClick={(s) => {
        changeView(...getStep(s));
      }}
      names={steps.steps.map((s, i) => {
        const isFirst = i === 0;

        return {
          ...s,
          disabled: s.status || (!isFirst && !steps.steps[i - 1]?.status),
        };
      })}
    />
  );
};

export const NebuiaStepsList: FC<
  NebuiaStepsContextProviderProps & {
    enableBackground?: boolean;
  }
> = ({ kyc, onFinish, email, phone, getKeys, enableBackground }) => {
  return (
    <ThemeProvider>
      <NebuiaStepsContextProvider {...{ kyc, onFinish, email, phone, getKeys }}>
        <NebuiaStepsDocumentContextProvider>
          <Layout enableBackground={enableBackground}>
            <div className="flex h-full flex-col items-center justify-start">
              <Content />
            </div>
            <NextImage
              className="w-full max-w-[4rem] lg:max-w-[6rem] xl:max-w-[8rem]"
              width="640"
              height="84"
              src="https://i.ibb.co/Vvr94nP/powerby-ver1.png"
              alt="Powered by NebuIA"
            />
          </Layout>
        </NebuiaStepsDocumentContextProvider>
      </NebuiaStepsContextProvider>
    </ThemeProvider>
  );
};
