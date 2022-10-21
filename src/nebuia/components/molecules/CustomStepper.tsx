import { FC } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';

type CustomStepperProps = {
  className?: string;
  steps: string[];
  currentStep?: string;
};
type StepStatus = {
  complete: boolean;
  isCancelled?: boolean;
};
const Step: FC<StepStatus> = ({ complete, isCancelled = false }) => {
  return (
    <div
      className={clsxm(
        'h-2 w-2 rounded-full',
        complete
          ? 'bg-secondary-500'
          : isCancelled
          ? 'bg-secondary-500'
          : 'bg-gray-300',
      )}
    />
  );
};
const Line: FC<StepStatus> = ({ complete, isCancelled = false }) => {
  return (
    <div
      className={clsxm(
        'h-1 w-8',
        complete
          ? 'bg-secondary-500'
          : isCancelled
          ? 'bg-red-500'
          : 'bg-gray-300',
      )}
    ></div>
  );
};
export const CustomStepper: FC<CustomStepperProps> = ({
  className,
  currentStep,
  steps,
}) => {
  return (
    <div className={clsxm(className, 'flex items-center justify-center')}>
      {steps
        .map((_, i) => {
          const position = currentStep ? steps.indexOf(currentStep) + 1 : 1;
          const complete = i < position;
          if (i < steps.length - 1) {
            return [
              <Step complete={complete} key={`${i}_step`} />,
              <Line complete={complete} key={`${i}_line`} />,
            ];
          }

          return <Step complete={complete} key={`${i}_step`} />;
        })
        .flat()}
    </div>
  );
};
