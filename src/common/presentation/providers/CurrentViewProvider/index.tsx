import { FC, PropsWithChildren, useMemo, useState } from 'react';

import { currentViewContext, Views } from './Context';

export const CurrentViewProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentView, setCurrentView] = useState<Views>('initial');

  const value = useMemo(() => ({ currentView, setCurrentView }), [currentView]);

  return (
    <currentViewContext.Provider value={value}>
      {children}
    </currentViewContext.Provider>
  );
};
