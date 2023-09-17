import { FC, PropsWithChildren, useMemo, useState } from 'react';

import { Action, controlActionContext } from './ControlActionsContext';

export const ControlActionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [prev, setPrev] = useState<Action>();
  const [next, setNext] = useState<Action>();

  const value = useMemo(
    () => ({
      previous: prev,
      setNext,
      setPrevious: setPrev,
      next,
    }),
    [next, prev],
  );

  return (
    <controlActionContext.Provider value={value}>
      {children}
    </controlActionContext.Provider>
  );
};
