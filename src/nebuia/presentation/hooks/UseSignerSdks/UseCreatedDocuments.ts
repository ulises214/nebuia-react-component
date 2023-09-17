import { NebuiaSignDocuments } from '@nebuia-ts/sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNebuiaSdk } from '../UseRepository';

type Result = {
  loading: boolean;
  result: {
    templateId?: string;
    documentId: string;
    link?: string;
  }[];
  append: (arg: {
    documentId: string;
    templateId: string;
    link: string;
  }) => void;
};
export const useCreatedDocuments = ({
  sdk,
}: {
  sdk: NebuiaSignDocuments | undefined;
}): Result => {
  const nebuiaSdk = useNebuiaSdk();
  const [result, setResult] = useState<Omit<Result, 'append'>>({
    loading: true,
    result: [],
  });

  useEffect(() => {
    if (!sdk) {
      return;
    }
    sdk
      .getReportDocuments({ kycId: nebuiaSdk.getReport() })
      .then((r) => {
        r.status &&
          setResult((old) => ({
            ...old,
            result: [...old.result, ...r.payload],
          }));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setResult((old) => ({
          ...old,
          loading: false,
        }));
      });
  }, [nebuiaSdk, sdk]);

  const append = useCallback(
    (data: { documentId: string; templateId: string; link: string }) => {
      setResult((old) => ({
        ...old,
        result: [...old.result, data],
      }));
    },
    [],
  );

  return useMemo(() => ({ ...result, append }), [append, result]);
};
