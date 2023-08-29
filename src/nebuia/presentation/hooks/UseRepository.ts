import { NebuiaReportsUtils, NebuiaWidget } from '@nebuia-ts/sdk';
import { useContext } from 'react';

import { RepositoryContext } from '../providers/RepositoryContext';

export const useNebuiaSdk = (): NebuiaWidget => {
  const context = useContext(RepositoryContext);

  return context.sdk;
};

export const useNebuiaUtils = (): NebuiaReportsUtils => {
  const context = useContext(RepositoryContext);

  return context.utils;
};
