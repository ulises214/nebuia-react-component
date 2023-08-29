import { FC, PropsWithChildren, useState } from 'react';

import { Action, controlActionContext } from './ControlActionsContext';

export const ControlActionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [prev, setPrev] = useState<Action>();
  const [next, setNext] = useState<Action>();

  return (
    <controlActionContext.Provider
      value={{
        previous: prev,
        setNext,
        setPrevious: setPrev,
        next,
      }}
    >
      {children}
    </controlActionContext.Provider>
  );
};
