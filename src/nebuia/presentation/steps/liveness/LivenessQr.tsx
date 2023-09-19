import { generate } from 'lean-qr';
import { makeAsyncComponent } from 'lean-qr/extras/react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LivenessQr.module.css';

import { P } from '../../../../common/presentation/components/atoms/P';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import clsxm from '../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { useLivenessCheckStatus } from '../../hooks/UseLivenessCheckStatus';
import { useLivenessMobileImage } from '../../hooks/UseLivenessMobileImage';
import { useReportSteps } from '../../providers/ReportSteps/Context';

// creates a react component (do this at the top-level)
const QR = makeAsyncComponent(React, generate);

export const LivenessQr = () => {
  const { dark } = useTheme().theme;
  const { t } = useTranslation();
  const link = useLivenessMobileImage();
  const faceCompleted = useLivenessCheckStatus();
  const { onNextStep } = useReportSteps();
  useControlButton({
    action: onNextStep,
    label: t('common.continue'),
    side: 'next',
    active: faceCompleted,
  });

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="relative">
        {link && (
          <QR
            content={link}
            className={clsxm(styles['qr'], dark && styles['qr-dark'])}
          />
        )}
        <img
          src="https://nebuia.com/img/logo.png"
          className={clsxm(
            'absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full p-1',
            dark ? 'bg-black' : 'bg-white',
          )}
          width={50}
          alt="Logo"
        />
      </div>
      <P className="mt-8 text-center font-bold">
        {t('pages.livenessQr.title')}
      </P>
      <P className="mt-4 max-w-xs text-center">
        {t('pages.livenessQr.description')}
      </P>
    </div>
  );
};
