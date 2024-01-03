import { generate } from 'lean-qr';
import { makeAsyncComponent } from 'lean-qr/extras/react';
import * as React from 'react';
import { useCallback } from 'react';
import { isDesktop } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import Button from '../../../../common/presentation/components/atoms/buttons/Button';
import { P } from '../../../../common/presentation/components/atoms/P';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import clsxm from '../../../../common/presentation/utils/clsxm';
import { useFaceStore } from '../../../../new-face/store/store';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { useLivenessCheckStatus } from '../../hooks/UseLivenessCheckStatus';
import { useLivenessMobileImage } from '../../hooks/UseLivenessMobileImage';

// creates a react component (do this at the top-level)
const Qr = makeAsyncComponent(React, generate);
const QrLink = () => {
  const { dark } = useTheme().theme;

  const link = useLivenessMobileImage();

  return (
    <div className="relative">
      {link && (
        <Qr
          content={link}
          className={clsxm('size-[15rem]', dark && 'invert')}
        />
      )}
      <img
        src="https://nebuia.com/img/logo.png"
        className={clsxm(
          'absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full p-1',
          dark ? 'bg-black' : 'bg-white',
        )}
        width={30}
        alt="Logo"
      />
    </div>
  );
};

export const LivenessQr = ({
  fromChoice,
  onFinish,
}: {
  fromChoice: boolean;
  onFinish?: VoidFunction;
}) => {
  const { setState } = useFaceStore();
  const { t } = useTranslation();
  const faceCompleted = useLivenessCheckStatus();

  const onContinue = useCallback(() => {
    setState({ type: 'complete' });
    onFinish?.();
  }, [onFinish, setState]);
  useControlButton({
    action: onContinue,
    label: t('common.continue'),
    side: 'next',
    active: faceCompleted,
  });
  const error = `pages.livenessQr.description2.${
    isDesktop ? 'desktop' : 'mobile'
  }`;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {isDesktop && <QrLink />}
      <P className="mt-8 font-bold text-center">
        {t('pages.livenessQr.title')}
      </P>
      <P className="max-w-xs mt-4 text-center">
        {t(fromChoice ? `pages.livenessQr.description` : error)}
      </P>
      {!isDesktop && (
        <Button variant="primary" onClick={() => setState({ type: 'idle' })}>
          {t('common.retry')}
        </Button>
      )}
    </div>
  );
};
