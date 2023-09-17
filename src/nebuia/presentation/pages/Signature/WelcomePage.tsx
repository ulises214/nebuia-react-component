import { useTranslation } from 'react-i18next';

import { Loader } from '../../../../common/presentation/components/atoms/Loader';
import { P } from '../../../../common/presentation/components/atoms/P';
import { H1 } from '../../../../common/presentation/components/atoms/titles/H1';
import { HAPPY_GIRL_JUMPING } from '../../../../common/presentation/constants/HappyGirlJumping';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import { useSignatureContext } from './SignatureContext';

export const SignatureDocumentsWelcomePage = () => {
  const { t } = useTranslation();
  const { docsListResult, goToList } = useSignatureContext();
  useControlButton({
    action: goToList,
    label: t('pages.genericWelcome.startButton'),
    side: 'next',
  });

  if (docsListResult.loading) {
    return (
      <div className="flex flex-col justify-center">
        <Loader />
      </div>
    );
  }
  if (docsListResult.error) {
    return <div>{docsListResult.error}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <figure>
        <img src={HAPPY_GIRL_JUMPING} alt="" className="w-full max-w-[27rem]" />
      </figure>
      <H1>{t('pages.signatureWelcome.title')}</H1>
      <P className="text-center">
        {t('pages.signatureWelcome.shortDescription')}
      </P>
    </div>
  );
};
