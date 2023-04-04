import { FC, PropsWithChildren } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';

import clsxm from '../lib/common/utils/clsxm';
import { H1, SizedBox } from '../nebuia/components/atoms';
import { useNebuiaStepsContext } from '../nebuia/context/NebuiaStepsContext';
import { IconButton } from './atoms/buttons/IconButton';

export const Layout: FC<PropsWithChildren<{ enableBackground?: boolean }>> = ({
  children,
  enableBackground = false,
}) => {
  const { view, title, finishStep } = useNebuiaStepsContext();

  return (
    <div
      className={clsxm(
        enableBackground && 'bg-nebuia-background',
        'p-1',
        'flex flex-col items-center',
        'w-full max-w-xl h-full',
      )}
    >
      <SizedBox height="s15" />
      <div className="flex w-full items-center gap-2">
        {view && (
          <IconButton
            className="!p-1"
            onClick={() => {
              finishStep();
            }}
          >
            <MdArrowBackIosNew className="h-6 w-6 text-black" />
          </IconButton>
        )}
        <H1 center className="grow">
          {title}
        </H1>
      </div>
      <SizedBox height="s15" />
      {children}
    </div>
  );
};
