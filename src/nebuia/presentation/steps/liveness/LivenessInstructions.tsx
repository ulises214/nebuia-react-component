import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { P } from '../../../../common/presentation/components/atoms/P';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import clsxm from '../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { ILUMINATION_BOY, PHONE_GIRL, SELFIE_BOY } from './images';

const IMAGES = [SELFIE_BOY, ILUMINATION_BOY, PHONE_GIRL];

const Dot = ({ active }: { active: boolean }) => {
  const { dark } = useTheme().theme;

  return (
    <span
      className={clsxm(
        'inline-block h-2 w-2 rounded-full',
        'transition-all transform',
        active && 'bg-nebuia-primary-500 scale-150',
        !active && {
          'bg-gray-300': !dark,
          'bg-gray-500': dark,
        },
      )}
    />
  );
};

export const LivenessInstructions: FC<{
  onFinished: VoidFunction;
}> = ({ onFinished }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((currentPhoto) => (currentPhoto + 1) % IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useControlButton({
    label: t('common.continue'),
    action: onFinished,
    side: 'next',
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-[1.13] w-full max-w-[27rem]">
        {IMAGES.map((src, i) => {
          return (
            <figure
              key={i}
              className={clsxm(
                'w-full',
                'transition-all duration-500',
                'absolute top-0 left-0', // Position the images absolutely
                currentPhoto === i
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none', // Show only the current image
              )}
            >
              <img src={src} alt="" className="w-full max-w-[27rem]" />
            </figure>
          );
        })}
      </div>
      <div className="flex -translate-y-5 gap-4">
        {IMAGES.map((_, i) => (
          <Dot key={i} active={i === currentPhoto} />
        ))}
      </div>
      <P className="max-w-sm text-center">
        {t(`pages.livenessInstructions.${currentPhoto}`)}
      </P>
    </div>
  );
};
