import { NebuiaStepsList } from '../nebuia';
import { Container } from './container';

const query = new URLSearchParams(window.location.search);

const getFromQuery = (key: string) => {
  const value = query.get(key);

  return value ?? undefined;
};

const API_KEY = getFromQuery('api_key');
const API_SECRET = getFromQuery('api_secret');
const REPORT = getFromQuery('report');

const Empty = () => {
  return (
    <Container>
      <div>
        <h1>api_key and api_secret are required</h1>
        <p>
          You can get them from{' '}
          <a href="https://admin.nebuia.com" target="_blank" rel="noreferrer">
            https://admin.nebuia.com
          </a>
        </p>
      </div>
    </Container>
  );
};

export const NebuiaDemoContent = () => {
  if (!API_KEY || !API_SECRET) {
    return <Empty />;
  }

  return (
    <Container>
      <NebuiaStepsList
        enableBackground
        kyc={REPORT}
        onFinish={async (report) => {
          if ('parent' in window) {
            window.parent.postMessage(report, '*');
          }
          if ('opener' in window && window.opener) {
            (window.opener as typeof window['parent']).postMessage(report, '*');
          }

          return Promise.resolve();
        }}
        getKeys={() => {
          return Promise.resolve({
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            keyId: 'YOUR_KEY_ID',
          });
        }}
      />
    </Container>
  );
};
