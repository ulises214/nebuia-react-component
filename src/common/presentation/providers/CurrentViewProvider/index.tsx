import { FC, PropsWithChildren, useState } from 'react';

import { currentViewContext } from './Context';

export const CurrentViewProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentView, setCurrentView] = useState<JSX.Element>();

  return (
    <currentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </currentViewContext.Provider>
  );
};
