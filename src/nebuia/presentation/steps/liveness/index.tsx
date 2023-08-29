import { FC, useCallback, useState } from 'react';

import { LivenessCapture } from './LivenessCapture';
import { LivenessInstructions } from './LivenessInstructions';

type LivenessView = 'instructions' | 'capture';

export const LivenessStep: FC = () => {
  const [view, setView] = useState<LivenessView>('instructions');

  const removeInstructions = useCallback(() => {
    setView('capture');
  }, []);

  if (view === 'instructions') {
    return <LivenessInstructions onFinished={removeInstructions} />;
  }

  return <LivenessCapture />;
};
