import { useOptionalCompanySteps } from '../../../../nebuia/presentation/providers/CompanySteps/context';
import { poweredBy } from '../../constants/images/PoweredBy';
import { ControlsBack } from './Controls';
import { StepIndicator } from './StepIndicator';

export const Header = () => {
  const { error } = useOptionalCompanySteps() ?? {};

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
      <StepIndicator />
    </div>
  );
};
