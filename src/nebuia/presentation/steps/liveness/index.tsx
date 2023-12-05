import { FC, useCallback, useState } from 'react';
import { isDesktop } from 'react-device-detect';

import { NebuiaFace } from '../../../../new-face/new-face';
import { LivenessChoice } from './LivenessChoise';
import { LivenessInstructions } from './LivenessInstructions';
import { LivenessQr } from './LivenessQr';

type LivenessView = 'instructions' | 'capture' | 'choice' | 'qr';

export const LivenessStep: FC = () => {
  const [view, setView] = useState<LivenessView>(
    isDesktop ? 'choice' : 'instructions',
  );

  const removeInstructions = useCallback(() => {
    setView('capture');
  }, []);
  const continueIn = useCallback((step: 'mobile' | 'web') => {
    return () => {
      setView(step === 'web' ? 'capture' : 'qr');
    };
  }, []);

  if (view === 'choice') {
    return (
      <LivenessChoice
        continueInMobile={continueIn('mobile')}
        continueInWeb={continueIn('web')}
      />
    );
  }

  if (view === 'qr') {
    return <LivenessQr fromChoice />;
  }

  if (view === 'instructions') {
    return <LivenessInstructions onFinished={removeInstructions} />;
  }

  return <NebuiaFace />;
};
