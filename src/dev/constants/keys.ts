// eslint-disable-next-line simple-import-sort/imports
import {
  API_KEY as EnvKey,
  API_SECRET as EnvSecret,
  SIGN_DOCUMENTS as EnvSignDocuments,
  KEY_SOURCE,
  REPORT_ID,
} from '../env';
import { getFromQuery } from '../utils/getValueFromQuery';

const QuerySecret = getFromQuery('api_secret');
const QueryKey = getFromQuery('api_key');
export const QueryReport = getFromQuery('report');
export const QuerySignDocuments = getFromQuery('sign_documents') === 'true';

export const API_KEY = KEY_SOURCE === 'FILE' ? EnvKey : QueryKey;
export const API_SECRET = KEY_SOURCE === 'FILE' ? EnvSecret : QuerySecret;
export const REPORT = KEY_SOURCE === 'FILE' ? REPORT_ID : QueryReport;
export const SIGN_DOCUMENTS =
  KEY_SOURCE === 'FILE' ? EnvSignDocuments : QuerySignDocuments;
