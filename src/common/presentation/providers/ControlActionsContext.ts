import { createContext, useContext } from 'react';

import {
  ParamCallback,
  PromiseOrCallback,
} from '../../../nebuia/domain/types/ParamCallback';

export type Action = {
  label: string;
  action: PromiseOrCallback<void>;
  active: boolean;
  show: boolean;
};
export interface ControlActionContextValue {
  next?: Action;
  previous?: Action;

  setNext: ParamCallback<Action | undefined>;
  setPrevious: ParamCallback<Action | undefined>;
}
export const controlActionContext = createContext<ControlActionContextValue>(
  {} as ControlActionContextValue,
);

export const useControlAction = (): ControlActionContextValue =>
  useContext(controlActionContext);
