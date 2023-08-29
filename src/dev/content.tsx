import { NebuiaStepsList } from '../nebuia';
import { EmptyKeys } from './components/empty_keys';
import { API_KEY, API_SECRET, REPORT } from './constants/keys';
import { Container } from './container';

export const NebuiaDemoContent = () => {
  if (!API_KEY || !API_SECRET) {
    return <EmptyKeys />;
  }

  return (
    <Container>
      <NebuiaStepsList
        enableBackground
        isForSignaturePage
        withDetailsPage
        // email="ulises@nebuia.com"
        // phone="+523123398831"
        kyc={REPORT}
        onFinish={async (report) => {
          console.log('report', report);
          if ('parent' in window) {
            window.parent.postMessage(report, '*');
          }
          if ('opener' in window && window.opener) {
            (window.opener as (typeof window)['parent']).postMessage(
              report,
              '*',
            );
          }

          return Promise.resolve();
        }}
        getKeys={() => {
          return {
            apiKey: API_KEY as string,
            apiSecret: API_SECRET as string,
          };
        }}
      />
    </Container>
  );
};
