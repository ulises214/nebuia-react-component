import { WidgetProps } from '../nebuia/domain/types/WidgetProps';

const API_KEY = import.meta.env['VITE_API_KEY'] as string | undefined;
const API_SECRET = import.meta.env['VITE_API_SECRET'] as string | undefined;
const REPORT_ID = import.meta.env['VITE_REPORT_ID'] as string | undefined;
const SIGN_DOCUMENTS = import.meta.env['VITE_SIGN_DOCUMENTS'] === 'true';
const REPORT_TYPE = import.meta.env['VITE_REPORT_TYPE'] as string | undefined;

const keySource = {
  FILE: 'FILE',
  QUERY: 'QUERY',
} as const;

const reportTypes: Record<WidgetProps['reportType'], string> = {
  CREDITS_ENROLLMENT: 'CREDITS_ENROLLMENT',
  SIGNATURE: 'SIGNATURE',
  KYC: 'KYC',
} as const;

const envOption = import.meta.env['VITE_KEYS_SOURCE'] as string | undefined;

const keysSource = (
  Object.keys(keySource).includes(envOption ?? '') ? envOption : 'QUERY'
) as keyof typeof keySource;
const reportType = (
  Object.keys(reportTypes).includes(REPORT_TYPE ?? '') ? REPORT_TYPE : 'KYC'
) as keyof typeof reportTypes;

export const getReportType = (
  value: string,
  def: keyof typeof reportTypes,
): keyof typeof reportTypes => {
  if (Object.keys(reportTypes).includes(value)) {
    return value as keyof typeof reportTypes;
  }

  return def;
};

export {
  API_KEY,
  API_SECRET,
  keysSource as KEY_SOURCE,
  REPORT_ID,
  reportType as REPORT_TYPE,
  SIGN_DOCUMENTS,
};
