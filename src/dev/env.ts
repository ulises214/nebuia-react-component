const API_KEY = import.meta.env.VITE_API_KEY as string;
const API_SECRET = import.meta.env.VITE_API_SECRET as string;

if (typeof API_KEY !== 'string') {
  throw new Error('API_KEY is not a string');
}

if (typeof API_SECRET !== 'string') {
  throw new Error('API_URL is not a string');
}

export { API_KEY, API_SECRET };
