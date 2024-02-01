import { FC, PropsWithChildren } from 'react';

import { useWidgetConfig } from '../../../../nebuia/presentation/providers/WidgetConfig/Context';
import clsxm from '../../utils/clsxm';
import { ControlsNext } from './Controls';
import { DebugTag } from './DebugTag';
import { Header } from './Header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { enableWidgetBackground } = useWidgetConfig();

  return (
    <div
      className={clsxm(
        enableWidgetBackground && 'bg-nebuia-background',
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
