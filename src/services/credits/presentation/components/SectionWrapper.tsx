import { P } from '@components/atoms/P';
import {
  useCreditsCompanyContext,
  useCreditsStepContext,
} from '@nebuia-services/credits/context/credits-context';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

export const SectionWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { company } = useCreditsCompanyContext();
  const { step } = useCreditsStepContext();
  const { t } = useTranslation();
  if (!company) {
    return <></>;
  }

  return (
    <div className="p-6 space-y-6 rounded-md shadow-md">
      <P className="text-center font-bold text-lg">
        {t(`services.credit.${step}.title`)}
      </P>
      <P>{t(`services.credit.${step}.message`)}</P>
      {children}
    </div>
  );
};
