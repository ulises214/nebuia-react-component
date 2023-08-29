import { NebuiaKeys } from '@nebuia-ts/models';
import { NebuiaReportsUtils, NebuiaWidget } from '@nebuia-ts/sdk';
import { FC, PropsWithChildren, useEffect, useMemo } from 'react';

import { useTheme } from '../../../theme/presentation/hooks/UseTheme';
import { RepositoryContext } from './RepositoryContext';

type Props = {
  keys: NebuiaKeys;
  kyc?: string;
};

export const NebuiaSdkProvider: FC<PropsWithChildren<Props>> = ({
  keys,
  children,
  kyc,
}) => {
  const { setColorScheme } = useTheme();

  const [sdk, nebuiaUtils] = useMemo(() => {
    const sdk = new NebuiaWidget(keys);
    const nebuiaUtils = new NebuiaReportsUtils(keys);
    kyc && sdk.setReport(kyc);

    return [sdk, nebuiaUtils];
  }, [keys, kyc]);

  useEffect(() => {
    sdk
      .getCompanyTheme()
      .then((theme) => {
        theme.status && setColorScheme(theme.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sdk, setColorScheme]);

  return (
    <RepositoryContext.Provider
      value={{
        sdk,
        utils: nebuiaUtils,
      }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};
