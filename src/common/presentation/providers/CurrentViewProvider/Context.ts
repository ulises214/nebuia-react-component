import { createContext, useContext } from 'react';

export type Views = 'initial' | 'steps' | 'details';
type CurrentViewContextType = {
  currentView?: Views;
  setCurrentView: (view: Views) => void;
};
export const currentViewContext = createContext<CurrentViewContextType>(
  {} as CurrentViewContextType,
);

export const useCurrentView = (): CurrentViewContextType =>
  useContext(currentViewContext);