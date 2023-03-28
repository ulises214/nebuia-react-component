import { createRoot } from 'react-dom/client';

import '../index.css';

import { NebuiaStepsList } from '../index';
import { Container } from './container';
import { API_KEY, API_SECRET } from './env';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <Container>
    <NebuiaStepsList
      onFinish={async (data) => {
        // eslint-disable-next-line no-console
        (await Promise.resolve(() => console.log('onFinish', data)))();
      }}
      kyc="64234a10a99c19d28856c6b6"
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
