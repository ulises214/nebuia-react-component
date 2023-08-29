import { createContext, useContext } from 'react';

type CurrentViewContextType = {
  currentView?: JSX.Element;
  setCurrentView: (view: JSX.Element) => void;
};
export const currentViewContext = createContext<CurrentViewContextType>(
  {} as CurrentViewContextType,
);

export const useCurrentView = (): CurrentViewContextType =>
  useContext(currentViewContext);
