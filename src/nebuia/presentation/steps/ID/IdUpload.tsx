import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../../../common/presentation/components/atoms/Loader';
import { P } from '../../../../common/presentation/components/atoms/P';
import { Alert } from '../../../../common/presentation/components/molecules/Alert';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import { useUploadIdImages } from '../../hooks/UseUploladIdImagest';
import { useReportSteps } from '../../providers/ReportSteps/Context';

type Props = {
  images: { key: string; img: string }[];
  doc: 'ine' | 'passport';
  cancel: () => void;
};
export const IdUpload: FC<Props> = ({ doc, images, cancel }) => {
  const { t } = useTranslation();
  const { onNextStep } = useReportSteps();
  const parsedImages = useMemo(() => images.map((i) => i.img), [images]);
  const [loading, error, result] = useUploadIdImages({
    docType: doc,
    images: parsedImages,
  });
  const handleNext = useCallback(async () => {
    if (loading) {
      return;
    }
    if (result?.result) {
      await onNextStep();

      return;
    }
    await result?.retry();

    return;
  }, [loading, onNextStep, result]);

  useControlButton({
    action: handleNext,
    label: error ? t('common.retry') : t('common.continue'),
    side: 'next',
    active: !loading,
  });

  useControlButton({
    action: cancel,
    label: t('common.retryProcess'),
    side: 'previous',
    active: !loading,
  });

  return (
    <div className="mt-8 flex size-full flex-col items-center gap-4 overflow-y-auto">
      {!loading && !error && !result?.result && (
        <>
          <P className="max-w-sm text-center">
            {t(`pages.id.upload.info.description`)}
          </P>
          <div className="flex flex-col gap-4 lg:flex-row">
            {images.map((image) => (
              <picture key={image.key}>
                <img
                  src={`data:image/png;base64,${image.img}`}
                  alt=""
                  className="mx-auto w-full max-w-[18rem] border border-solid border-emerald-500"
                />
              </picture>
            ))}
          </div>
        </>
      )}
      {loading && <Loader />}
      {result?.result && (
        <Alert
          title={t('pages.id.upload.success.title')}
          message={t(`pages.id.upload.success.description`)}
          variant="success"
        />
      )}
      {error && (
        <Alert
          title={t('pages.id.upload.error.title')}
          message={t(`pages.id.upload.error.description`)}
          variant="error"
        />
      )}
    </div>
  );
};
