import { FC, PropsWithChildren } from 'react';

import clsxm from '../../utils/clsxm';
import { ControlsNext } from './Controls';
import { DebugTag } from './DebugTag';
import { Header } from './Header';

export const Layout: FC<PropsWithChildren<{ enableBackground?: boolean }>> = ({
  children,
  enableBackground = false,
}) => {
  return (
    <div
      className={clsxm(
        enableBackground && 'bg-nebuia-background',
        'p-2 relative',
        'flex flex-col items-center',
        'w-full max-w-xl max-h-[50rem] h-full space-y-2',
      )}
    >
      <DebugTag />
      <Header />
      <div className="flex w-full grow flex-col items-center">{children}</div>
      <ControlsNext />
    </div>
  );
};
