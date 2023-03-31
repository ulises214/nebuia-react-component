import { BrowserView, MobileView } from 'react-device-detect';

import { FaceAnalyzerDesktop } from './desktop';
import { FaceAnalyzerMobile } from './mobile';

export const FaceAnalyzer = () => {
  return (
    <>
      <MobileView>
        <FaceAnalyzerMobile></FaceAnalyzerMobile>
      </MobileView>
      <BrowserView>
        <FaceAnalyzerDesktop />
      </BrowserView>
    </>
  );
};
