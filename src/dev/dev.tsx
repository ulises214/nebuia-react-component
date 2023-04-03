import { createRoot } from 'react-dom/client';

import '../index.css';

import { NebuiaStepsList } from '../index';
import { Container } from './container';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}
const query = new URLSearchParams(window.location.search);
const getFromQueryOrPrompt = <T,>(key: string, defaultValue: T) => {
  const value = query.get(key);
  if (value) {
    return value as unknown as T;
  }

  return prompt(`Insert ${key}`) ?? defaultValue;
};

const API_KEY = getFromQueryOrPrompt('API_KEY', '');
const API_SECRET = getFromQueryOrPrompt('API_SECRET', '');
const REPORT = getFromQueryOrPrompt('REPORT', undefined);
const EMAIL = getFromQueryOrPrompt('EMAIL', undefined);
const PHONE = getFromQueryOrPrompt('PHONE', undefined);

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
        (await Promise.resolve(() => console.log('onFinish', data)))();
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
