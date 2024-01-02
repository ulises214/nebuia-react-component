import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useOptionalReportSteps } from '../../../../nebuia/presentation/providers/ReportSteps/Context';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { useCurrentView } from '../../providers/CurrentViewProvider/Context';
import clsxm from '../../utils/clsxm';
import { P } from '../atoms/P';

const Line: FC<{ completed: boolean }> = ({ completed }) => {
  const {
    theme: { dark },
  } = useTheme();

  return (
    <div
      className={clsxm(
        'h-1',
        'w-full',
        completed && 'bg-nebuia-primary-500',
        'rounded-full',
        'transition-colors',
        !completed && {
          'bg-gray-300': !dark,
          'bg-gray-500': dark,
        },
      )}
    />
  );
};
export const StepIndicator: FC = () => {
  const { currentStep, reportSteps } = useOptionalReportSteps() ?? {};
  const { currentView } = useCurrentView();
  const { t } = useTranslation();
  if (!currentStep || !reportSteps) {
    return null;
  }
  const currentStepIndex = reportSteps.findIndex(
    ({ name }) => name === currentStep,
  );

  if (currentView !== 'steps') {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <P className="flex flex-col items-center xl:flex-row">
        <span className="font-bold">{t(`stepsNames.${currentStep}`)}</span>{' '}
        <span>
          (
          {t(`stepsProgress.stepNofN`, {
            current: currentStepIndex + 1,
            total: reportSteps.length,
          })}
          )
        </span>
      </P>
      <div className="flex w-full gap-1 px-2">
        {reportSteps.map(({ name }, i) => (
          <Line key={name} completed={i <= currentStepIndex} />
        ))}
      </div>
    </div>
  );
};
