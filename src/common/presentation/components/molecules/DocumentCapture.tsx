import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ParamCallback } from '../../../../nebuia/domain/types/ParamCallback';
import { useControlButton } from '../../hooks/UseControlButton';
import { Loader } from '../atoms/Loader';
import { P } from '../atoms/P';
import { Alert } from './Alert';
import { DropFileInput } from './inputs/DropFileInput';

type Props = {
  image: string;
  titleKey: string;
  messageKey: string;
  inputLabelKey: string;
  onLoad: ParamCallback<File>;
  error?: boolean;
  errorTitleKey: string;
  errorMessageKey: string;
  isLoading: boolean;
  type: ('img' | 'pdf')[];
};

export const DocumentCaptureInstructions: FC<
  Pick<Props, 'image' | 'messageKey' | 'titleKey'>
> = ({ image, messageKey, titleKey }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4">
      <picture>
        <img src={image} alt="" className="max-w-sm" />
      </picture>
      <P className="text-center font-bold">{t(titleKey)}</P>
      <P className="max-w-sm text-center">{t(messageKey)}</P>
    </div>
  );
};

const PickFile: FC<
  Pick<
    Props,
    | 'inputLabelKey'
    | 'error'
    | 'errorMessageKey'
    | 'errorTitleKey'
    | 'isLoading'
    | 'type'
    | 'messageKey'
  > & {
    setFile: ParamCallback<File>;
  }
> = ({
  inputLabelKey,
  error,
  errorMessageKey,
  errorTitleKey,
  isLoading,
  type,
  setFile,
  messageKey,
}) => {
  const { t } = useTranslation();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <P className="max-w-sm text-center">{t(messageKey)}</P>
      <DropFileInput
        type={type}
        id={`upload-${type.join(',')}`}
        label={t(inputLabelKey)}
        onFileChange={(file) => {
          if (!file) {
            return;
          }
          setFile(file);
        }}
      />
      {error && (
        <Alert
          title={t(errorTitleKey)}
          message={t(errorMessageKey)}
          variant="error"
        />
      )}
    </div>
  );
};

export const DocumentCapture: FC<Props> = ({
  image,
  messageKey,
  titleKey,
  inputLabelKey,
  onLoad,
  isLoading,
  errorMessageKey,
  errorTitleKey,
  type,
  error,
}) => {
  const { t } = useTranslation();
  const [showInstructions, setShowInstructions] = useState(true);

  const handleNext = useCallback(() => {
    if (showInstructions) {
      setShowInstructions(false);
    }
  }, [showInstructions]);

  const allowContinue = useMemo(() => {
    if (showInstructions) {
      return true;
    }

    return false;
  }, [showInstructions]);

  useControlButton({
    action: handleNext,
    label: t('common.continue'),
    side: 'next',
    active: allowContinue,
  });

  if (showInstructions) {
    return (
      <DocumentCaptureInstructions
        image={image}
        messageKey={messageKey}
        titleKey={titleKey}
      />
    );
  }

  return (
    <PickFile
      {...{
        errorMessageKey,
        errorTitleKey,
        inputLabelKey,
        isLoading,
        setFile: onLoad,
        type,
        error,
        messageKey,
      }}
    />
  );
};
