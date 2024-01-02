import { NebuiaAddress } from '@nebuia-ts/models';
import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../../../common/presentation/components/atoms/Loader';
import { P } from '../../../../common/presentation/components/atoms/P';
import { Alert } from '../../../../common/presentation/components/molecules/Alert';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import clsxm from '../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { useSaveAddress } from '../../hooks/UseSaveAddress';
import { useReportSteps } from '../../providers/ReportSteps/Context';
import { HomeImage } from './images';

export const AddressList: FC<{
  address: NebuiaAddress;
  onRetryProcess: VoidFunction;
}> = ({ address, onRetryProcess }) => {
  const { onNextStep } = useReportSteps();
  const { dark } = useTheme().theme;
  const { t } = useTranslation();
  const [isLoading, error, result] = useSaveAddress({
    address,
  });
  const handleNext = useCallback(async () => {
    if (result?.success) {
      await onNextStep();

      return;
    }
    const pass = await result?.retry();
    if (pass) {
      await onNextStep();
    }
  }, [onNextStep, result]);

  const allowNext = useMemo(() => {
    if (isLoading) {
      return false;
    }
    if (result?.success === undefined || error) {
      return true;
    }

    if (!result.success) {
      return false;
    }

    return true;
  }, [error, isLoading, result?.success]);

  useControlButton({
    action: onRetryProcess,
    label: t('common.retryProcess'),
    side: 'previous',
  });

  useControlButton({
    action: handleNext,
    label: t('common.continue'),
    side: 'next',
    active: allowNext,
  });

  if (!address.address) {
    return null;
  }

  return (
    <div className="pt-8 space-y-4">
      <P className="max-w-sm text-center">
        {t(
          `pages.address.successCapture.${
            address.address.length > 1 ? 'many' : 'one'
          }`,
          {
            count: address.address.length,
          },
        )}
      </P>
      <ul className="p-2 space-y-4">
        {address.address.map((item) => (
          <li
            className={clsxm(
              'flex gap-4 items-center border border-solid border-nebuia-primary-500f',
              'max-w-md rounded-md p-4',
              {
                'bg-slate-900': dark,
                'shadow-md': !dark,
              },
            )}
            key={item}
          >
            <picture>
              <img src={HomeImage} alt="" />
            </picture>
            <P>{item}</P>
          </li>
        ))}
      </ul>
      {error && (
        <Alert
          title={t('pages.address.error.title')}
          message={t('pages.address.error.description')}
          variant="error"
        />
      )}
      {result?.success && (
        <Alert
          title={t('pages.address.successUpload.title')}
          message={t('pages.address.successUpload.description')}
          variant="success"
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};
