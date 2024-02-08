import { NebuiaCompany } from 'nebuia-ts/models';
import { FC, PropsWithChildren, useMemo, useState } from 'react';

import { companyContext } from './credits-context';

export const CreditsCompanyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [company, setCompany] = useState<NebuiaCompany['settings']>();

  const value = useMemo(() => {
    return {
      company,
      setCompany,
    };
  }, [company]);

  return (
    <companyContext.Provider value={value}>{children}</companyContext.Provider>
  );
};
