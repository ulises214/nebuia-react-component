import NebuiaStepsList from '../nebuia';
import { EmptyKeys, EmptyReport } from './components/empty_keys';
import { API_KEY, API_SECRET, REPORT } from './constants/keys';
import { Container } from './container';

export const NebuiaDemoContent = ({
  faceStandAlone,
  checkReport,
}: {
  faceStandAlone?: boolean;
  checkReport?: boolean;
}) => {
  if (!API_KEY || !API_SECRET) {
    return <EmptyKeys />;
  }
  if (checkReport && REPORT === undefined) {
    return <EmptyReport />;
  }

  return (
    <Container>
      <NebuiaStepsList
        enableBackground
        withDetailsPage
        signDocuments
        isFaceStandAlone={faceStandAlone}
        kyc={REPORT}
        onFinish={async (report) => {
          if (window.parent !== window) {
            window.parent.postMessage(report, '*');
          } else if (
            window.opener &&
            window.opener !== window &&
            'postMessage' in window.opener
          ) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            window.opener.postMessage(report, '*');
          } else {
            alert(`KYC completed, your report: ${JSON.stringify(report)}`);
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
