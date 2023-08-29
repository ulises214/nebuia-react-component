import {
  API_KEY as EnvKey,
  API_SECRET as EnvSecret,
  KEY_SOURCE,
  REPORT_ID,
} from '../env';
import { getFromQuery } from '../utils/getValueFromQuery';

const QuerySecret = getFromQuery('api_secret');
const QueryKey = getFromQuery('api_key');
export const QueryReport = getFromQuery('report');

export const API_KEY = KEY_SOURCE === 'FILE' ? EnvKey : QueryKey;
export const API_SECRET = KEY_SOURCE === 'FILE' ? EnvSecret : QuerySecret;
export const REPORT = KEY_SOURCE === 'FILE' ? REPORT_ID : QueryReport;
