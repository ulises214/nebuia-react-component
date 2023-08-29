const API_KEY = import.meta.env['VITE_API_KEY'] as string | undefined;
const API_SECRET = import.meta.env['VITE_API_SECRET'] as string | undefined;
const REPORT_ID = import.meta.env['VITE_REPORT_ID'] as string | undefined;

const keySource = {
  FILE: 'FILE',
  QUERY: 'QUERY',
} as const;

const envOption = import.meta.env['VITE_KEYS_SOURCE'] as string | undefined;

const keysSource = (
  Object.keys(keySource).includes(envOption ?? '') ? envOption : 'QUERY'
) as keyof typeof keySource;

export { API_KEY, API_SECRET, keysSource as KEY_SOURCE, REPORT_ID };
