import { useEffect, useRef, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { AiFillCheckCircle } from 'react-icons/ai';

import Button from '../../../components/atoms/buttons/Button';
import { P } from '../../components/atoms';
import { ListTile } from '../../components/molecules';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { FaceAnalyzerDesktop } from './desktop';
import { FaceAnalyzerMobile } from './mobile';

export const FaceAnalyzerOld = () => {
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

const LivenessUrl = 'https://face.nebuia.com';

const Completed = () => {
  const { finishStep } = useNebuiaStepsContext();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center">
      <ListTile
        className="px-5 pb-4"
        leading={<AiFillCheckCircle className="text-emerald-500" />}
        title={<P>Prueba de vida satisfactoria</P>}
        subtitle="La prueba de vida se terminó satisfactoriamente"
      />
      <Button
        variant="primary"
        className="!w-auto"
        onClick={() => finishStep()}
      >
        Finalizar
      </Button>
    </div>
  );
};

export const FaceAnalyzer = () => {
  const { kyc, keys, finishStep } = useNebuiaStepsContext();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed) {
      return;
    }
    const hasPassed = (data: unknown): data is { status: true } => {
      if (typeof data !== 'object' || data === null) {
        return false;
      }

      if (!('status' in data)) {
        return false;
      }

      return (data as { status: unknown }).status === true;
    };

    const receiveMessage = (event: MessageEvent) => {
      const url = new URL(LivenessUrl);
      if (event.origin !== url.origin) {
        return;
      }
      if (hasPassed(event.data)) {
        setCompleted(true);
      }
    };
    window.addEventListener('message', receiveMessage, false);

    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, [completed, finishStep]);

  if (completed) {
    return <Completed />;
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Face Analyzer - Nebuia"
        id="face_nebuia"
        width="100%"
        height="500"
        src={`${LivenessUrl}?key=${keys.apiKey}&secret=${keys.apiSecret}&report=${kyc}`}
        allow="camera"
      />
    </>
  );
};
