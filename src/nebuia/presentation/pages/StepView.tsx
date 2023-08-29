import { FC } from 'react';

import { useReportSteps } from '../providers/ReportSteps/Context';
import { useWidgetConfig } from '../providers/WidgetConfig/Context';
import { AddressStep } from '../steps/Adress';
import { EmailPhone } from '../steps/EmailPhone';
import { IDStep } from '../steps/ID';
import { LivenessStep } from '../steps/liveness';
import { FinishDetailsPage } from './DetailsPage';

export const StepsView: FC = () => {
  const { currentStep } = useReportSteps();
  const { withDetailsPage } = useWidgetConfig();
  if (!currentStep && withDetailsPage) {
    return <FinishDetailsPage />;
  }
  if (!currentStep) {
    return <></>;
  }

  if (currentStep === 'liveness') {
    return <LivenessStep />;
  }

  if (currentStep === 'id') {
    return <IDStep />;
  }
  if (currentStep === 'email') {
    return <EmailPhone type="email" key="email" />;
  }
  if (currentStep === 'phone') {
    return <EmailPhone type="phone" key="phone" />;
  }

  return <AddressStep />;
};
