import { NebuiaKeys } from '@nebuia-ts/models';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import { useNebuiaSdk } from '../../hooks/UseRepository';
import { useReportSteps } from '../../providers/ReportSteps/Context';
import { LivenessCompleted } from './LivenesCompleted';

const LivenessUrl = 'https://face.nebuia.com';

export const LivenessCapture = () => {
  const sdk = useNebuiaSdk();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { onNextStep } = useReportSteps();
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();
  const [keys, setKeys] = useState<{ keys: NebuiaKeys; report: string }>();

  useEffect(() => {
    void sdk.keys.then((res) => {
      res.status &&
        setKeys({
          keys: res.payload,
          report: sdk.getReport(),
        });
    });
  }, [sdk]);
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
  }, [completed]);

  const handleBack = useCallback(() => {
    setCompleted(false);
  }, []);

  useControlButton({
    action: onNextStep,
    label: t('common.continue'),
    side: 'next',
    active: completed,
  });
  useControlButton({
    action: handleBack,
    label: t('common.retryProcess'),
    side: 'previous',
    active: completed,
    show: completed,
  });

  if (completed) {
    return <LivenessCompleted />;
  }
  if (!keys) {
    return null;
  }

  return (
    <iframe
      ref={iframeRef}
      title="Face Analyzer - Nebuia"
      id="face_nebuia"
      width="100%"
      height="500"
      src={`${LivenessUrl}?key=${keys.keys.apiKey}&secret=${keys.keys.apiSecret}&report=${keys.report}`}
      allow="camera"
    />
  );
};
