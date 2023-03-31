import { FC, useCallback, useState } from 'react';

import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { NebuiaApiRepository } from '../../../repository/ApiRepository';
import { FaceAnalyzerView } from './view';

export const FaceAnalyzerDesktop: FC = () => {
  const indexCon = useNebuiaStepsContext();
  const [isLive, setIsLive] = useState(false);

  // from camera preview generate thumbnails for face detection
  const checkQuality = useCallback(
    async (image: Blob): Promise<boolean> => {
      const response = await NebuiaApiRepository.qualityFace({
        img: image,
        keys: indexCon.keys,
        report: indexCon.kyc,
      });
      if (!response.status) {
        return false;
      }
      if (!(response.payload > 30)) {
        return false;
      }
      const analiceResponse = await NebuiaApiRepository.analiceFace({
        img: image,
        keys: indexCon.keys,
        report: indexCon.kyc,
      });
      if (!analiceResponse.status) {
        return false;
      }
      setIsLive(analiceResponse.payload.status);

      return analiceResponse.payload.status;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const finalize = useCallback(() => {
    indexCon.finishStep();
  }, [indexCon]);

  return (
    <FaceAnalyzerView
      {...{
        capture: checkQuality,
        finalize,
        isAlive: isLive,
        title: 'Prueba de vida',
      }}
    ></FaceAnalyzerView>
  );
};
