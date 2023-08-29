/* eslint-disable simple-import-sort/imports */
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import {
  NebuiaReport,
  ReportValidity,
  checkNebuiaReportValidity,
} from '@nebuia-ts/models';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../theme/presentation/hooks/UseTheme';
import clsxm from '../utils/clsxm';
import { P } from './atoms/P';

const SummaryIcon: FC<{ status: ReportValidity }> = ({ status }) => {
  let Icon = CheckCircleIcon;
  if (status === ReportValidity.REJECTED) {
    Icon = XCircleIcon;
  }
  if (status === ReportValidity.DANGER) {
    Icon = ExclamationCircleIcon;
  }

  return (
    <div
      className={clsxm(
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

export const ReportSummaryCard: FC<{ report: NebuiaReport }> = ({ report }) => {
  const { t } = useTranslation();
  const { status } = checkNebuiaReportValidity(report);
  const {
    theme: { dark },
  } = useTheme();

  return (
    <div
      className={clsxm(
        'rounded-lg border max-w-md',
        'flex items-center flex-col md:flex-row gap-4 py-2 px-6',
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
        <P className="text-xl">
          {t(`common.reportValidity.${status.toLowerCase()}.title`)}
        </P>
        <P>{t(`common.reportValidity.${status.toLowerCase()}.message`)}</P>
      </div>
    </div>
  );
};
