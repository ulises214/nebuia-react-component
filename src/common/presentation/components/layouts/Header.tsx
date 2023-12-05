import { useOptionalCompanySteps } from '../../../../nebuia/presentation/providers/CompanySteps/context';
import { useWidgetConfig } from '../../../../nebuia/presentation/providers/WidgetConfig/Context';
import { poweredBy } from '../../constants/images/PoweredBy';
import { ControlsBack } from './Controls';
import { StepIndicator } from './StepIndicator';

export const Header = () => {
  const { error } = useOptionalCompanySteps() ?? {};
  const { isFaceStandAlone } = useWidgetConfig();

  return (
    <div className="relative flex w-full flex-col items-center">
      <ControlsBack />
      <img
        className="w-full max-w-[7rem]"
        // width="700"
        // height="84"
        src={poweredBy}
        alt="Powered by NebuIA"
      />
      {error && <div>{error}</div>}
      {!isFaceStandAlone && <StepIndicator />}
    </div>
  );
};
