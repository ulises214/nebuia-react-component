import { NebuiaKeys } from '@nebuia-ts/models';
import {
  NebuiaCreditsEnrollment,
  NebuiaReportsUtils,
  NebuiaWidget,
} from '@nebuia-ts/sdk';
import { FC, PropsWithChildren, useEffect, useMemo } from 'react';

import { updateUrl } from '../../../common/domain/utils/updateUrl';
import { useTheme } from '../../../theme/presentation/hooks/UseTheme';
import { RepositoryContext, RepositoryContextValue } from './RepositoryContext';
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

  const [sdk, nebuiaUtils, enrollment] = useMemo(() => {
    const sdk = new NebuiaWidget(keys);
    const nebuiaUtils = new NebuiaReportsUtils(keys);
    const enrollment = new NebuiaCreditsEnrollment(
      keys,
      import.meta.env.DEV ? 'http://localhost:5402/api' : undefined,
    );
    if (kyc) {
      sdk.setReport(kyc);
      enrollment.setReport(kyc);
      updateUrl('report', kyc);
    }

    return [sdk, nebuiaUtils, enrollment];
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

  const value = useMemo<RepositoryContextValue>(
    () => ({
      sdk,
      utils: nebuiaUtils,
      creditsEnrollment: enrollment,
    }),
    [sdk, nebuiaUtils, enrollment],
  );

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
};
