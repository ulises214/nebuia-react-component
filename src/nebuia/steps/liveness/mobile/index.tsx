import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

import { Optional } from '../../../../lib/common/Optional';
import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { NebuiaApiRepository } from '../../../repository/ApiRepository';
import { FaceAnalyzerMobileView } from './view';

export const FaceAnalyzerMobile = () => {
  const indexCon = useNebuiaStepsContext();
  const [isLive, setIsLive] = useState<boolean>();
  const [currentImage, setCurrentImage] = useState<Optional<File>>();
  const [loading, setLoading] = useState(false);

  const checkQuality = useCallback(
    async (image: Optional<File>): Promise<boolean> => {
      if (
        image &&
        ![
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/webp',
          'image/tiff',
          'image/bmp',
        ].includes(image.type)
      ) {
        void Swal.fire({
          title: 'Error',
          text: 'El archivo seleccionado no es una imagen',
          icon: 'error',
        });

        return false;
      }

      setCurrentImage(image);
      setIsLive(undefined);
      if (!image) {
        return false;
      }

      setLoading(true);
      const analiceResponse = await NebuiaApiRepository.analiceFace({
        img: image,
        keys: indexCon.keys,
        report: indexCon.kyc,
      });
      setLoading(false);
      if (!analiceResponse.status) {
        setIsLive(analiceResponse.status);

        return false;
      }
      setIsLive(analiceResponse.payload.status);

      return analiceResponse.payload.status;
    },
    [indexCon.keys, indexCon.kyc],
  );
  const finalize = useCallback(() => {
    indexCon.finishStep();
  }, [indexCon]);

  return (
    <FaceAnalyzerMobileView
      {...{
        onCapture: (file) => void checkQuality(file),
        finalize,
        currentImage,
        loading,
        isAlive: isLive,
        title: 'Prueba de vida',
      }}
    ></FaceAnalyzerMobileView>
  );
};
