/* eslint-disable simple-import-sort/imports */

import {
  NebuiaReport,
  ReportValidity,
  checkNebuiaReportValidity,
} from 'nebuia-ts/models';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { Alert, AlertVariants } from './molecules/Alert';

const mapValidityToVariant = (status: ReportValidity): AlertVariants => {
  switch (status) {
    case 'DANGER':
      return 'warning';
    case 'REJECTED':
      return 'error';
    case 'SUCCESS':
      return 'success';
  }
};

export const ReportSummaryCard: FC<{ report: NebuiaReport }> = ({ report }) => {
  const { t } = useTranslation();
  const { status } = checkNebuiaReportValidity(report);

  return (
    <div className='max-w-md'>
      <Alert
        variant={mapValidityToVariant(status)}
        title={t(`common.reportValidity.${status.toLowerCase()}.title`)}
        message={t(`common.reportValidity.${status.toLowerCase()}.message`)}
      />
    </div>
  );
};
