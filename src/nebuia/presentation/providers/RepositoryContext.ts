import {
  NebuiaCreditsEnrollment,
  NebuiaReportsUtils,
  NebuiaWidget,
} from 'nebuia-ts/sdk';
import { createContext } from 'react';

export interface RepositoryContextValue {
  readonly sdk: NebuiaWidget;
  readonly utils: NebuiaReportsUtils;
  readonly creditsEnrollment: NebuiaCreditsEnrollment;
}

export const RepositoryContext = createContext<RepositoryContextValue>(
  {} as RepositoryContextValue,
);
