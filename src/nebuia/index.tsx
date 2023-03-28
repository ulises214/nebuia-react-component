import { FC } from 'react';

import clsxm from '../lib/common/utils/clsxm';
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

const getStep = (step: CompleteStep) => {
  if (step.name === 'email') {
    return <EmailPhone type="email" />;
  }
  if (step.name === 'phone') {
    return <EmailPhone type="phone" />;
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

export const NebuiaStepsList: FC<
  NebuiaStepsContextProviderProps & {
    enableBackground?: boolean;
  }
> = ({ kyc, onFinish, email, phone, getKeys, enableBackground }) => {
  return (
    <ThemeProvider>
      <NebuiaStepsContextProvider {...{ kyc, onFinish, email, phone, getKeys }}>
        <NebuiaStepsDocumentContextProvider>
          <div
            className={clsxm('p-1', enableBackground && 'bg-nebuia-background')}
          >
            <Content></Content>
          </div>
        </NebuiaStepsDocumentContextProvider>
      </NebuiaStepsContextProvider>
    </ThemeProvider>
  );
};
