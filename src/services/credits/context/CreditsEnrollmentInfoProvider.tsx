import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import {
  CreditsEnrollmentInfoContext,
  enrollmentInfoContext,
} from './credits-context';

export const CreditsEnrollmentInfoProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<CreditsEnrollmentInfoContext['data']>({
    files: [],
    nss: '',
  });

  const updateData = useCallback<CreditsEnrollmentInfoContext['setData']>(
    (newData) => {
      setData((prevData) => ({ ...prevData, ...newData }));
    },
    [],
  );

  const value = useMemo(() => {
    return {
      data,
      setData: updateData,
    };
  }, [data, updateData]);

  return (
    <enrollmentInfoContext.Provider value={value}>
      {children}
    </enrollmentInfoContext.Provider>
  );
};
