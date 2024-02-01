// eslint-disable-next-line simple-import-sort/imports
import {
  API_KEY as EnvKey,
  REPORT_ID as EnvReportId,
  REPORT_TYPE as EnvReportType,
  API_SECRET as EnvSecret,
  SIGN_DOCUMENTS as EnvSignDocuments,
  KEY_SOURCE,
  getReportType,
} from '../env';
import { getFromQuery } from '../utils/getValueFromQuery';

const QuerySecret = getFromQuery('api_secret');
const QueryKey = getFromQuery('api_key');
const QueryReport = getFromQuery('report');
const QuerySignDocuments = getFromQuery('sign_documents') === 'true';
const _queryReportType = getFromQuery('report_type');

const FROM_FILE = {
  API_KEY: EnvKey,
  API_SECRET: EnvSecret,
  REPORT: EnvReportId,
  REPORT_TYPE: EnvReportType,
  SIGN_DOCUMENTS: EnvSignDocuments,
};

const FROM_QUERY = {
  API_KEY: QueryKey,
  API_SECRET: QuerySecret,
  REPORT: QueryReport,
  REPORT_TYPE: getReportType(_queryReportType ?? '', 'KYC'),
  SIGN_DOCUMENTS: QuerySignDocuments,
};

const toExport = KEY_SOURCE === 'FILE' ? FROM_FILE : FROM_QUERY;

export const API_KEY = toExport.API_KEY;
export const API_SECRET = toExport.API_SECRET;
export const REPORT = toExport.REPORT;
export const REPORT_TYPE = toExport.REPORT_TYPE;
export const SIGN_DOCUMENTS = toExport.SIGN_DOCUMENTS;
