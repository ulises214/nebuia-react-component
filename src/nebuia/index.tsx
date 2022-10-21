import { FC } from 'react';

import { LoaderIndicator } from './components/atoms';
import { NebuiaStepsInstructions } from './components/organisms/NebuiaStepsInstructions';
import {
  NebuiaStepsContextProvider,
  NebuiaStepsContextProviderProps,
  useNebuiaStepsContext,
} from './context/NebuiaStepsContext';
import { NebuiaStepsDocumentContextProvider } from './context/NebuiaStepsDocumentContext';
import { NebuiaThemeContextProvider } from './context/NebuiaThemeContext';
import { CompleteStep } from './models/CompleteStep';
import { Address } from './steps/Address';
import { Email } from './steps/Email';
import { Selection } from './steps/id/Selection';
import { FaceInstruction } from './steps/liveness/Instructions';
import { Phone } from './steps/Phone';

const getStep = (step: CompleteStep) => {
  if (step.name === 'email') {
    return <Email />;
  }
  if (step.name === 'phone') {
    return <Phone />;
  }
  if (step.name === 'id') {
    return <Selection />;
  }
  if (step.name === 'liveness') {
    return <FaceInstruction />;
  }

  return <Address />;
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
        changeView(getStep(s));
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

export const NebuiaStepsList: FC<NebuiaStepsContextProviderProps> = ({
  kyc,
  onFinish,
  email,
  phone,
  getKeys,
}) => {
  return (
    <NebuiaStepsContextProvider {...{ kyc, onFinish, email, phone, getKeys }}>
      <NebuiaStepsDocumentContextProvider>
        <NebuiaThemeContextProvider>
          <Content></Content>
        </NebuiaThemeContextProvider>
      </NebuiaStepsDocumentContextProvider>
    </NebuiaStepsContextProvider>
  );
};
