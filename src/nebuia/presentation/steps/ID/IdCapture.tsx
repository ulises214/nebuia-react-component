import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../../../common/presentation/components/atoms/Loader';
import { P } from '../../../../common/presentation/components/atoms/P';
import { Alert } from '../../../../common/presentation/components/molecules/Alert';
import { DocumentCaptureInstructions } from '../../../../common/presentation/components/molecules/DocumentCapture';
import { DropFileInput } from '../../../../common/presentation/components/molecules/inputs/DropFileInput';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import { ParamCallback } from '../../../domain/types/ParamCallback';
import { useAnaliceIdImage } from '../../hooks/UseAnaliceIdImage';
import { ID_BACKDROP_BIG, ID_FRONTAL_BIG } from './Images';
import { Documents, IdAction } from './types';

type Props = {
  current: keyof typeof Documents;
  setAction: ParamCallback<IdAction>;
  frontalImage?: string;
  backImage?: string;
  setFrontalImage: ParamCallback<string | undefined>;
  setBackImage: ParamCallback<string | undefined>;
};

type TupleItems<R> = R extends readonly (infer T)[] ? T : never;

const UploadCard: FC<{
  image?: string;
  side: TupleItems<(typeof Documents)['ine']['sides']>;
  setImage: ParamCallback<string>;
  showInstructions: boolean;
}> = ({ setImage, side, image, showInstructions }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();

  const [isLoading, error, _] = useAnaliceIdImage({
    image: file,
    onSetImage: setImage,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (showInstructions) {
    return (
      <DocumentCaptureInstructions
        image={side === 'front' ? ID_FRONTAL_BIG : ID_BACKDROP_BIG}
        messageKey="pages.id.capture.instructions.description.longMessage"
        titleKey={`pages.id.capture.instructions.description.title.${side}`}
      />
    );
  }

  if (error ?? !image) {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <P className="max-w-sm text-center">
          {t(`pages.id.capture.instructions.description.title.${side}`)}
        </P>
        <DropFileInput
          type={['img']}
          id={`upload-${side}`}
          label={t(`pages.id.capture.instructions.title`)}
          onFileChange={(file) => {
            if (!file) {
              return;
            }
            setFile(file);
          }}
        />
        {error && (
          <Alert
            title={t('pages.id.capture.error.title')}
            message={t('pages.id.capture.error.description')}
            variant="error"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <picture>
        <img
          src={`data:image/png;base64,${image}`}
          alt=""
          className="mx-auto w-full max-w-[18rem] border border-solid border-emerald-500"
        />
      </picture>
      <Alert
        title={t('pages.id.capture.congratulations.title')}
        message={t(`pages.id.capture.congratulations.description.${side}`)}
        variant="success"
      />
    </div>
  );
};

export const IdCapture: FC<Props> = ({
  current,
  setAction,
  setBackImage,
  setFrontalImage,
  backImage,
  frontalImage,
}) => {
  const { t } = useTranslation();
  const doc = useMemo(() => Documents[current], [current]);

  const [showInstructions, setShowInstructions] = useState(true);
  const [currentSide, setCurrentSide] =
    useState<TupleItems<(typeof doc)['sides']>>('front');

  const handleNext = useCallback(() => {
    if (showInstructions) {
      setShowInstructions(false);

      return;
    }
    if (currentSide === 'front' && doc.sides.length > 1) {
      setShowInstructions(true);
      setCurrentSide('back');

      return;
    }

    setAction('upload');
  }, [currentSide, doc.sides.length, setAction, showInstructions]);

  const handleBack = useCallback(() => {
    const currImage = currentSide === 'front' ? frontalImage : backImage;
    const currImageHandler =
      currentSide === 'front' ? setFrontalImage : setBackImage;
    if (currImage) {
      currImageHandler(undefined);

      return;
    }
    if (!showInstructions) {
      setShowInstructions(true);

      return;
    }
    if (currentSide === 'back') {
      setCurrentSide('front');
      setShowInstructions(true);

      return;
    }
    setAction('selection');
    // if (currentSide === 'back') {
    //   if (backImage) {
    //     setBackImage(undefined);

    //     return;
    //   }
    //   setCurrentSide('front');
    // }
    // if (currentSide === 'front') {
    //   if (frontalImage) {
    //     setFrontalImage(undefined);

    //     return;
    //   }
    //   setAction('selection');
    // }
  }, [
    backImage,
    currentSide,
    frontalImage,
    setAction,
    setBackImage,
    setFrontalImage,
    showInstructions,
  ]);

  const isNextAllowed = useMemo(() => {
    if (showInstructions) {
      return true;
    }
    if (currentSide === 'front' && !frontalImage) {
      return false;
    }

    if (currentSide === 'back' && !backImage) {
      return false;
    }

    return true;
  }, [backImage, currentSide, frontalImage, showInstructions]);

  const backLabel = useMemo(() => {
    if (showInstructions) {
      return t('common.back');
    }
    if (currentSide === 'front') {
      return frontalImage ? t('common.retryProcess') : t('common.back');
    }

    return backImage ? t('common.retryProcess') : t('common.back');
  }, [backImage, currentSide, frontalImage, showInstructions, t]);

  useControlButton({
    action: handleNext,
    label: t('common.continue'),
    side: 'next',
    active: isNextAllowed,
  });
  useControlButton({
    action: handleBack,
    label: backLabel,
    side: 'previous',
  });

  return (
    <div className="flex w-full flex-col items-center justify-center pt-8">
      {currentSide === 'front' && (
        <UploadCard
          side={currentSide}
          image={frontalImage}
          setImage={setFrontalImage}
          showInstructions={showInstructions}
        />
      )}
      {currentSide === 'back' && (
        <UploadCard
          side={currentSide}
          image={backImage}
          setImage={setBackImage}
          showInstructions={showInstructions}
        />
      )}
    </div>
  );
};
