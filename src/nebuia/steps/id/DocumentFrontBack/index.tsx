import { FC, useCallback, useMemo, useState } from 'react';

import { Optional } from '../../../../lib/common/Optional';
import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { useNebuiaStepsDocumentContext } from '../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../models/Document';
import { NebuiaApiRepository } from '../../../repository/ApiRepository';
import { getBlobFromBase64 } from '../../../utils/BlobWindow';
import { deviceType } from '../../../utils/DeviceType';
import { DocumentPreview } from '../Preview';
import { Selection } from '../Selection';
import { DocumentView } from './view';

export const DocumentFrontBack: FC<{ section: DocumentSection }> = ({
  section,
}) => {
  const con = useNebuiaStepsContext();
  const { addImage } = useNebuiaStepsDocumentContext();

  const [error, setError] = useState<Optional<string>>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  // show error on document detection
  const _showError = useCallback((error: string) => {
    setError(error);
    setTimeout(() => setError(undefined), 3000);
  }, []);
  const isMobile = useMemo(() => {
    return deviceType() === 'mobile';
  }, []);
  // check image mobile
  const analyzeImage = useCallback(
    async (original: Blob) => {
      setIsUploading(true);
      const response = await NebuiaApiRepository.analiceID({
        keys: con.keys,
        report: con.kyc,
        img: original,
      });
      setIsUploading(false);
      if (!response.status) {
        _showError('Error al obtener documento.');

        return;
      }

      const decoded = getBlobFromBase64(response.payload.image);
      if (!decoded) {
        _showError('Error al obtener documento.');

        return;
      }
      addImage({ image: decoded, original });
      con.changeView(<DocumentPreview section={section} />);
    },
    [_showError, addImage, con, section],
  );

  // on file drag
  const _fillFile = useCallback(
    async (file: File) => {
      if (['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        await analyzeImage(file);
      } else {
        _showError('Tipo de archivo no admitido.');
      }
    },
    [analyzeImage, _showError],
  );
  const onFileChange = useCallback(
    (file: Optional<File>) => {
      file && _fillFile(file);
    },
    [_fillFile],
  );
  // return to document selection
  const back = useCallback(() => {
    con.changeView(<Selection />);
  }, [con]);

  return (
    <DocumentView
      analyzeImage={analyzeImage}
      section={section}
      isMobile={isMobile}
      back={back}
      error={error}
      isUploading={isUploading}
      onFileChange={onFileChange}
    ></DocumentView>
  );
};
