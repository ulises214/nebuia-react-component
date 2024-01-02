import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';

import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { useControlAction } from '../../providers/ControlActionsContext';
import clsxm from '../../utils/clsxm';
import { IconButton } from '../atoms/buttons/IconButton';
import { P } from '../atoms/P';

export const ControlsBack: FC = () => {
  const { previous } = useControlAction();
  const [loadingPrevious, setLoadingPrevious] = useState(false);

  const handlePrevious = async () => {
    setLoadingPrevious(true);
    await previous?.action();
    setLoadingPrevious(false);
  };

  if (!previous?.show) {
    return null;
  }

  return (
    <div className="!absolute inset-y-0 left-5">
      <IconButton
        isLoading={loadingPrevious}
        variant="ghost"
        onClick={() => void handlePrevious()}
        disabled={!previous.active}
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export const ControlsNext: FC = () => {
  const {
    theme: { dark },
  } = useTheme();

  const { next } = useControlAction();
  const [loadingNext, setLoadingNext] = useState(false);

  const handleNext = async () => {
    setLoadingNext(true);
    await next?.action();
    setLoadingNext(false);
  };

  if (!next?.show) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <P
        className={clsxm(
          !next.active && {
            'text-gray-400': dark,
            'text-gray-500': !dark,
          },
        )}
      >
        {next.label}
      </P>
      <IconButton
        isLoading={loadingNext}
        variant="primary"
        onClick={() => void handleNext()}
        className="!p-3"
        disabled={!next.active}
      >
        <ArrowRightIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
};
