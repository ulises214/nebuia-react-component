import { FC, useCallback, useMemo, useState } from 'react';

import { Optional } from '../../../../lib/common/Optional';
import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { useNebuiaStepsDocumentContext } from '../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../models/Document';
import { DocumentDecodedUtils } from '../../../models/DocumentDecoded';
import { NebuiaApiRepository } from '../../../repository/ApiRepository';
import { deviceType } from '../../../utils/DeviceType';
import { DocumentPreview } from '../Preview';
import { Selection } from '../Selection';
import { DocumentView } from './view';

export const DocumentFrontBack: FC<{ section: DocumentSection }> = ({
  section,
}) => {
  const con = useNebuiaStepsContext();
  const { document: nebuiaDocument, addImage } =
    useNebuiaStepsDocumentContext();

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
      const decoded = DocumentDecodedUtils.fromJson(response.payload);
      // check if image contains valid document
      if (!decoded.valid) {
        _showError('Tipo de documento no reconocido.');

        return;
      }
      // set document type found in image
      const type = decoded.type;
      // check match layer
      if (
        type !==
        nebuiaDocument.layers[section === DocumentSection.FRONT ? 0 : 1]
      ) {
        _showError('El documento proporcionado no corresponde al requerido.');

        return;
      }
      addImage({ image: decoded.image, original });
      con.changeView(<DocumentPreview section={section} />);
    },
    [_showError, addImage, con, nebuiaDocument.layers, section],
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
