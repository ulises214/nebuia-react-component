import { createRoot } from 'react-dom/client';

import '../index.css';

import { NebuiaStepsList } from '../index';
import { Container } from './container';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}
const query = new URLSearchParams(window.location.search);

const getFromQuery = (key: string) => {
  const value = query.get(key);

  return value ?? undefined;
};

const getFromQueryOrPrompt = <T,>(key: string, defaultValue: T) => {
  const value = query.get(key);

  if (value) {
    return value;
  }

  return prompt(`Insert ${key}`) ?? defaultValue;
};

const API_KEY = getFromQueryOrPrompt('API_KEY', '');
const API_SECRET = getFromQueryOrPrompt('API_SECRET', '');
const REPORT = getFromQuery('REPORT');
const EMAIL = getFromQuery('EMAIL');
const PHONE = getFromQuery('PHONE');

const root = createRoot(rootElement);
root.render(
  <Container>
    <NebuiaStepsList
      enableBackground
      email={EMAIL}
      phone={PHONE}
      kyc={REPORT}
      onFinish={async (data) => {
        // eslint-disable-next-line no-console
        (await Promise.resolve(() => alert(`onFinish = ${data}`)))();
      }}
      getKeys={() => {
        return Promise.resolve({
          apiKey: API_KEY,
          apiSecret: API_SECRET,
          keyId: 'YOUR_KEY_ID',
        });
      }}
    />
  </Container>,
);
