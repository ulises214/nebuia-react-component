import { NebuiaReportsUtils, NebuiaWidget } from '@nebuia-ts/sdk';
import { createContext } from 'react';

export interface RepositoryContextValue {
  sdk: NebuiaWidget;
  utils: NebuiaReportsUtils;
}

export const RepositoryContext = createContext<RepositoryContextValue>(
  {} as RepositoryContextValue,
);
