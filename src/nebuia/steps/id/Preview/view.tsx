import { FC, useEffect, useState } from 'react';

import { Optional } from '../../../../lib/common/Optional';
import { VoidCallback } from '../../../../lib/common/VoidCallback';
import Button from '../../../../lib/components/atoms/buttons/Button';
import NextImage from '../../../../lib/components/molecules/NextImage';
import { H1, P, SizedBox } from '../../../components/atoms';
import { useNebuiaStepsDocumentContext } from '../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../models/Document';
import { optionalBlobLink } from '../../../utils/BlobWindow';

type DocumentPreviewViewProps = {
  confirm: VoidCallback;
  back: VoidCallback;
  section: DocumentSection;
};
export const DocumentPreviewView: FC<DocumentPreviewViewProps> = (con) => {
  const { document } = useNebuiaStepsDocumentContext();
  const [url, setUrl] = useState<Optional<string>>(undefined);
  useEffect(() => {
    const blob = document.images[con.section === DocumentSection.FRONT ? 0 : 1];
    const url = optionalBlobLink(blob, 'image/png');
    setUrl(url);
  }, [con.section, document.images]);

  return (
    <div className="flex flex-col items-center">
      <SizedBox height="s35" />
      <H1 center>Comprobar legibilidad</H1>
      <SizedBox height="s10" />
      <P center secondary>
        Por favor verifica que los detalles de tu {document.name} sean claros y
        legibles. Sin borrosidad ni deslumbramiento
      </P>
      <SizedBox height="s15" />
      <div className="flex justify-center w-full">
        {url && (
          <NextImage
            useSkeleton
            alt={document.name}
            src={url}
            width={1920}
            height={1080}
            className="w-full h-auto max-w-xs"
          />
        )}
      </div>
      <SizedBox height="s15" />
      <div className="flex flex-col w-full gap-4 xs:flex-row justify-evenly">
        <Button onClick={() => void con.back()} variant="outline">
          Capturar nuevamente
        </Button>
        <Button variant="primary" onClick={() => void con.confirm()}>
          Confirmar
        </Button>
      </div>
    </div>
  );
};
