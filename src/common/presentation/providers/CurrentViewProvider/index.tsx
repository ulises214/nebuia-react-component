import { FC, PropsWithChildren, useState } from 'react';

import { currentViewContext, Views } from './Context';

export const CurrentViewProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentView, setCurrentView] = useState<Views>('initial');

  return (
    <currentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </currentViewContext.Provider>
  );
};
