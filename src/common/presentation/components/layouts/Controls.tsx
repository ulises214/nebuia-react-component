import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';

import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { useControlAction } from '../../providers/ControlActionsContext';
import clsxm from '../../utils/clsxm';
import { IconButton } from '../atoms/buttons/IconButton';
import { P } from '../atoms/P';

export const Controls: FC = () => {
  const {
    theme: { dark },
  } = useTheme();

  const { next, previous } = useControlAction();
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const handleNext = async () => {
    setLoadingNext(true);
    await next?.action();
    setLoadingNext(false);
  };

  const handlePrevious = async () => {
    setLoadingPrevious(true);
    await previous?.action();
    setLoadingPrevious(false);
  };

  return (
    <div className="flex w-full items-center gap-4">
      {previous?.show && (
        <div className="flex items-center gap-2">
          <IconButton
            isLoading={loadingPrevious}
            variant="primary"
            onClick={() => void handlePrevious()}
            disabled={!previous.active}
            className="!p-3"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </IconButton>
          <P
            className={clsxm(
              !previous.active && {
                'text-gray-400': dark,
                'text-gray-500': !dark,
              },
            )}
          >
            {previous.label}
          </P>
        </div>
      )}
      <div className="grow"></div>
      {next?.show && (
        <div className="flex items-center gap-2">
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
      )}
    </div>
  );
};
