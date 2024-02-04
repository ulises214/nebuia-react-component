import { useCreditsStepContext } from '@nebuia-services/credits/context/credits-context';
import { CreditsCompanyProvider } from '@nebuia-services/credits/context/CreditsCompanyProvider';
import { CreditsEnrollmentInfoProvider } from '@nebuia-services/credits/context/CreditsEnrollmentInfoProvider';
import { CreditsStepProvider } from '@nebuia-services/credits/context/CreditStepProvider';

import { DocumentsCreditEnrollment } from '../components/sections/Documents';
import { FinishCreditsEnrollment } from '../components/sections/Finish';
import { NssCreditEnrollment } from '../components/sections/Nss';
import { WelcomeCreditEnrollment } from '../components/sections/Welcome';

export default function WithProviders() {
  return (
    <CreditsStepProvider>
      <CreditsCompanyProvider>
        <CreditsEnrollmentInfoProvider>
          <NebuiaCreditCredit />
        </CreditsEnrollmentInfoProvider>
      </CreditsCompanyProvider>
    </CreditsStepProvider>
  );
}

function NebuiaCreditCredit() {
  const { step } = useCreditsStepContext();
  if (step === 'welcome') {
    return <WelcomeCreditEnrollment />;
  }

  if (step === 'nss') {
    return <NssCreditEnrollment />;
  }

  if (step === 'documents') {
    return <DocumentsCreditEnrollment />;
  }

  return <FinishCreditsEnrollment />;
}
