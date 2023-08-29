import { NebuiaReport } from '@nebuia-ts/models';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ActionHookResponse } from '../../../common/presentation/types/ActionHookResponse';
import { PromiseValueCallback } from '../../domain/types/ParamCallback';
import { useNebuiaSdk, useNebuiaUtils } from './UseRepository';

export type PdfResult = [string, undefined] | [undefined, ArrayBuffer];
type Res = {
  getReportPdf: PromiseValueCallback<PdfResult>;
  report?: NebuiaReport;
  image?: ArrayBuffer;
};
export const useGetReport: ActionHookResponse<Res> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [report, setReport] = useState<NebuiaReport>();
  const [image, setImage] = useState<ArrayBuffer>();
  const sdk = useNebuiaSdk();
  const utils = useNebuiaUtils();

  useEffect(() => {
    const get = async () => {
      const [report, face] = await Promise.all([
        utils.existReport({
          report: sdk.getReport(),
        }),
        sdk.getFace(),
      ]);
      report.status && setReport(report.payload);
      face.status && setImage(face.payload);
      if (!report.status || !face.status) {
        setError('No se pudo obtener el reporte');
      }
    };
    setIsLoading(true);
    get().finally(() => setIsLoading(false));
  }, [sdk, utils]);

  const getReportPdf = useCallback(async () => {
    debugger;
    const result = await utils.getPDF({ report: sdk.getReport() });
    if (result.status) {
      return [undefined, result.payload] as PdfResult;
    }

    return [result.payload, undefined] as PdfResult;
  }, [sdk, utils]);

  const result = useMemo(
    () => ({
      getReportPdf,
      report,
      image,
    }),
    [getReportPdf, image, report],
  );

  return [isLoading, error, result];
};
