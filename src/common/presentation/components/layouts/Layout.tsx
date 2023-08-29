import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { useOptionalCompanySteps } from '../../../../nebuia/presentation/providers/CompanySteps/context';
import { useOptionalReportSteps } from '../../../../nebuia/presentation/providers/ReportSteps/Context';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { poweredBy } from '../../constants/images/PoweredBy';
import clsxm from '../../utils/clsxm';
import { P } from '../atoms/P';
import { Controls } from './Controls';

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
const StepIndicator: FC = () => {
  const { currentStep, reportSteps } = useOptionalReportSteps() ?? {};
  const { t } = useTranslation();
  if (!currentStep || !reportSteps) {
    return <></>;
  }
  const currentStepIndex = reportSteps.findIndex(
    ({ name }) => name === currentStep,
  );

  return (
    <div className="flex w-full flex-col items-center gap-4">
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
export const Layout: FC<PropsWithChildren<{ enableBackground?: boolean }>> = ({
  children,
  enableBackground = false,
}) => {
  const { error } = useOptionalCompanySteps() ?? {};

  return (
    <div
      className={clsxm(
        enableBackground && 'bg-nebuia-background',
        'p-2',
        'flex flex-col items-center',
        'w-full max-w-xl max-h-[50rem] h-full space-y-2',
      )}
    >
      {import.meta.env.MODE === 'demo' && (
        <div className="text-center text-red-500">DEBUG</div>
      )}
      <img
        className="w-full max-w-[7rem]"
        // width="700"
        // height="84"
        src={poweredBy}
        alt="Powered by NebuIA"
      />
      <div className="mx-auto w-full">
        {error && <div>{error}</div>}
        <StepIndicator />
      </div>
      <div className="flex w-full grow flex-col items-center">{children}</div>
      <div className="w-full">
        <Controls />
      </div>
    </div>
  );
};
