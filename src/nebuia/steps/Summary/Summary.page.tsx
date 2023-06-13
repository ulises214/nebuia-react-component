/* eslint-disable no-use-before-define */
import { FC, useCallback, useEffect, useState } from 'react';
import { MdCheck, MdError, MdWarning } from 'react-icons/md';

import Button from '../../../components/atoms/buttons/Button';
import {
  checkReportValidity,
  ReportValidity,
} from '../../../lib/common/utils/checkReportValidity';
import classNames from '../../../lib/common/utils/clsxm';
import { H3, LoaderIndicator, P, SizedBox } from '../../components/atoms';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
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
      {report?.face && faceDocument && (
        <img
          src={faceDocument}
          alt={`Face: ${kyc}`}
          className="aspect-square w-full max-w-xs rounded-full object-cover"
        />
      )}
      {report && (
        <>
          <SizedBox height="s15" />
          <ReportSummaryCard report={report} />
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
  let Icon = MdCheck;
  if (status === ReportValidity.REJECTED) {
    Icon = MdError;
  }
  if (status === ReportValidity.DANGER) {
    Icon = MdWarning;
  }

  return (
    <div
      className={classNames(
        status === 'REJECTED' && 'bg-pink-600',
        status === 'SUCCESS' && 'bg-emerald-600',
        status === 'DANGER' && 'bg-amber-600',
        'rounded-full p-1 text-white',
      )}
    >
      <Icon className="h-9 w-9" />
    </div>
  );
};

export const ReportSummaryCard: FC<{ report: IKYC }> = ({ report }) => {
  const { status, summary, title } = checkReportValidity(report);
  const {
    theme: { dark },
  } = useNebuiaThemeContext();

  return (
    <div
      className={classNames(
        'rounded-lg border',
        'flex items-center flex-col md:flex-row gap-2 py-1 px-2',
        !dark && [
          status === 'REJECTED' && 'border-pink-600 bg-pink-50',
          status === 'DANGER' && 'border-amber-600 bg-amber-50',
          status === 'SUCCESS' && 'border-emerald-600 bg-emerald-50',
        ],
        dark && [
          status === 'REJECTED' && 'border-pink-600 bg-pink-900',
          status === 'DANGER' && 'border-amber-600 bg-amber-900',
          status === 'SUCCESS' && 'border-emerald-600 bg-emerald-900',
        ],
      )}
    >
      <SummaryIcon status={status} />
      <div className="flex grow flex-col">
        <H3>{title}</H3>
        <P>{summary}</P>
      </div>
    </div>
  );
};
