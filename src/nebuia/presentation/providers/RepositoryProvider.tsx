import { NebuiaKeys } from '@nebuia-ts/models';
import { NebuiaReportsUtils, NebuiaWidget } from '@nebuia-ts/sdk';
import { FC, PropsWithChildren, useEffect, useMemo } from 'react';

import { updateUrl } from '../../../common/domain/utils/updateUrl';
import { useTheme } from '../../../theme/presentation/hooks/UseTheme';
import { RepositoryContext } from './RepositoryContext';
import { useWidgetConfig } from './WidgetConfig/Context';

type Props = {
  keys: NebuiaKeys;
};

export const NebuiaSdkProvider: FC<PropsWithChildren<Props>> = ({
  keys,
  children,
}) => {
  const { setColorScheme } = useTheme();
  const { report: kyc } = useWidgetConfig();

  const [sdk, nebuiaUtils] = useMemo(() => {
    const sdk = new NebuiaWidget(keys);
    const nebuiaUtils = new NebuiaReportsUtils(keys);
    if (kyc) {
      sdk.setReport(kyc);
      updateUrl('report', kyc);
    }

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
