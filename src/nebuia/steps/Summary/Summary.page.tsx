/* eslint-disable no-use-before-define */
import { FC, useCallback, useEffect, useState } from 'react';
import { MdCheck, MdError, MdWarning } from 'react-icons/md';

import Button from '../../../components/atoms/buttons/Button';
import {
  checkReportValidity,
  ReportValidity,
} from '../../../lib/common/utils/checkReportValidity';
import { H3, LoaderIndicator, P, SizedBox } from '../../components/atoms';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { IKYC } from '../../models/Ikyc';
import { NebuiaApiRepository } from '../../repository/ApiRepository';
import { downloadBlob, getBlobLink } from '../../utils/BlobWindow';

export const SummaryPage = () => {
  const { onFinish, keys, kyc } = useNebuiaStepsContext();
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const [reportError, setReportError] = useState<string>();
  const [faceDocument, setFaceDocument] = useState<string>();
  const [report, setReport] = useState<IKYC>();

  useEffect(() => {
    const getFace = async () => {
      const [face, kycRes] = await Promise.all([
        NebuiaApiRepository.getFace({
          keys,
          report: kyc,
        }),
        NebuiaApiRepository.existReport({ keys, report: kyc }),
      ]);

      if (face.status) {
        setFaceDocument(getBlobLink(face.payload, 'image/png'));
      } else {
        setReportError(face.payload);
      }
      if (kycRes.status) {
        setReport(kycRes.payload);
      } else {
        setReportError(kycRes.payload);
      }
      setIsLoading(false);
    };
    void getFace();
  }, [keys, kyc]);

  const downloadReport = useCallback(async () => {
    setIsLoadingReport(true);
    const response = await NebuiaApiRepository.getPDF({ keys, report: kyc });
    if (response.status) {
      downloadBlob(response.payload, 'application/pdf', 'Reporte.pdf');
    } else {
      setReportError(response.payload);
    }
    setIsLoadingReport(false);
  }, [kyc, keys]);

  const done = useCallback(async () => {
    await onFinish(kyc);
  }, [kyc, onFinish]);

  if (isLoading) {
    return <LoaderIndicator />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-auto">
      <H3>Haz terminado el proceso de verificación</H3>
      <SizedBox height="s15" />

      <SizedBox height="s15" />
      {faceDocument && (
        <img
          src={faceDocument}
          alt={`Face: ${kyc}`}
          className="aspect-square w-full max-w-xs rounded-full object-cover"
        />
      )}
      {report && (
        <>
          <SizedBox height="s15" />

          <Summary {...{ report }} />
        </>
      )}
      <SizedBox height="s15" />

      {!isLoadingReport && reportError && (
        <div>
          <p className="text-center text-red-400">{reportError}</p>
        </div>
      )}
      <div className="flex w-full justify-evenly gap-2">
        <Button
          isLoading={isLoadingReport}
          variant="outline"
          onClick={() => void downloadReport()}
        >
          Descargar reporte
        </Button>
        <Button
          isLoading={isLoadingReport}
          variant="primary"
          onClick={() => void done()}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

const SummaryIcon: FC<{ status: ReportValidity }> = ({ status }) => {
  if (status === ReportValidity.REJECTED) {
    return (
      <div className="rounded-full bg-pink-600 p-1 text-white">
        <MdError className="h-6 w-6" />
      </div>
    );
  }
  if (status === ReportValidity.DANGER) {
    return (
      <div className="rounded-full bg-amber-600 p-1 text-white">
        <MdWarning className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="rounded-full bg-emerald-600 p-1 text-white">
      <MdCheck className="h-6 w-6" />
    </div>
  );
};

const Summary: FC<{ report: IKYC }> = ({ report }) => {
  const { status, summary, title } = checkReportValidity(report);

  return (
    <div className="flex max-w-md flex-col gap-2">
      <H3>{title}</H3>
      <div className="flex items-center gap-4">
        <SummaryIcon status={status} />
        <P>{summary}</P>
      </div>
    </div>
  );
};
