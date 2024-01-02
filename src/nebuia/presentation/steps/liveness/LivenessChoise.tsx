import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../common/presentation/components/atoms/buttons/Button';
import { P } from '../../../../common/presentation/components/atoms/P';
import { LIVENESS_CHOICE } from './images';

export const LivenessChoice: FC<{
  continueInWeb: VoidFunction;
  continueInMobile: VoidFunction;
}> = ({ continueInWeb, continueInMobile }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <figure>
        <img src={LIVENESS_CHOICE} alt="" className="w-full max-w-[27rem]" />
      </figure>
      <P className="max-w-xs text-center">
        {t('pages.livenessChoice.label.first')}
        <strong>{t('pages.livenessChoice.label.bold')}</strong>
        {t('pages.livenessChoice.label.last')}
      </P>
      <div className="flex w-full max-w-md gap-4 mt-8 justify-evenly">
        <Button onClick={continueInWeb} small variant="outline">
          {t('pages.livenessChoice.web')}
        </Button>
        <Button onClick={continueInMobile} small variant="primary">
          {t('pages.livenessChoice.mobile')}
        </Button>
      </div>
    </div>
  );
};
