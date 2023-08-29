import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../common/presentation/components/atoms/buttons/Button';
import { ReportSummaryCard } from '../../../../common/presentation/components/ReportValidityFlag';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import { PromiseValueCallback } from '../../../domain/types/ParamCallback';
import { PdfResult, useGetReport } from '../../hooks/UseGetReport';
import { useNebuiaSdk } from '../../hooks/UseRepository';
import { useWidgetConfig } from '../../providers/WidgetConfig/Context';

const DownloadButton: FC<{ getPdf: PromiseValueCallback<PdfResult> }> = ({
  getPdf,
}) => {
  const { t } = useTranslation();
  const { onFinished } = useWidgetConfig();
  const sdk = useNebuiaSdk();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const [, res] = await getPdf();
    setLoading(false);
    // download blob in browser by arraybuffer
    if (res) {
      const url = window.URL.createObjectURL(
        new Blob([new Uint8Array(res)], {
          type: 'application/pdf',
        }),
      );

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      link.setAttribute('target', '_blank');
      link.click();
    }
  };

  const handleContinue = useCallback(async () => {
    await onFinished(sdk.getReport());
  }, [onFinished, sdk]);

  useControlButton({
    active: !loading,
    action: handleContinue,
    label: t('common.finish'),
    side: 'next',
  });

  return (
    <Button
      center
      variant="primary"
      className="w-full"
      onClick={() => void handleClick()}
      isLoading={loading}
    >
      <CloudArrowDownIcon className="mr-2 h-6 w-6" />
      {t('common.downloadReport')}
    </Button>
  );
};

export const DetailsContent: FC<{
  result: Exclude<ReturnType<typeof useGetReport>[2], undefined>;
}> = ({ result }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {result.image && (
        <img
          // arraybuffer to base64 in browser
          src={`data:image/png;base64,${btoa(
            new Uint8Array(result.image).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          )}`}
          alt=""
          className="max-w-[14rem] rounded-full border-2 border-solid border-nebuia-primary-500 md:max-w-[16rem] xl:max-w-[20rem]"
        />
      )}
      {result.report && <ReportSummaryCard report={result.report} />}
      {result.report && <DownloadButton getPdf={result.getReportPdf} />}
    </div>
  );
};
