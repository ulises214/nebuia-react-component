import { FC, PropsWithChildren } from 'react';

import clsxm from '../lib/common/utils/clsxm';
import { H1, SizedBox } from '../nebuia/components/atoms';
import { useNebuiaStepsContext } from '../nebuia/context/NebuiaStepsContext';
import Button from './atoms/buttons/Button';

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
      <div className="flex w-full items-center justify-evenly">
        <H1 center className="relative">
          {title}
          {view && (
            <Button
              className="absolute inset-y-0 left-full ml-2"
              variant="ghost"
              onClick={() => {
                finishStep();
              }}
            >
              Volver
            </Button>
          )}
        </H1>
      </div>
      <SizedBox height="s15" />
      {children}
    </div>
  );
};
