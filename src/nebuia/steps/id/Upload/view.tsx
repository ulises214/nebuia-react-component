import { FC, useEffect, useState } from 'react';

import Button from '../../../../components/atoms/buttons/Button';
import NextImage from '../../../../components/molecules/NextImage';
import { Optional } from '../../../../lib/common/Optional';
import { VoidCallback } from '../../../../lib/common/VoidCallback';
import { H1, LoaderIndicator, P, SizedBox } from '../../../components/atoms';
import { useNebuiaStepsDocumentContext } from '../../../context/NebuiaStepsDocumentContext';
import { getBlobLink, removeBlobLink } from '../../../utils/BlobWindow';

type UploadDocumentViewProps = {
  back: VoidCallback;
  confirm: VoidCallback;
  error: Optional<string>;
  uploading: boolean;
  next: boolean;
};
export const UploadDocumentView: FC<UploadDocumentViewProps> = (con) => {
  const { document } = useNebuiaStepsDocumentContext();
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const images = document.images.map((i) => getBlobLink(i, 'image/png'));
    setImages(images);

    return () => {
      images.forEach(removeBlobLink);
    };
  }, [document.images]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SizedBox height="s35" />
      <H1 center>Subiendo documentos</H1>
      <SizedBox height="s10" />
      <P center>Por favor espera, estamos subiendo tus documentos</P>
      <SizedBox height="s15" />
      {images.map((image, key) => {
        return (
          <NextImage
            key={key}
            alt={image}
            src={image}
            width={1920}
            height={1080}
            className="w-full max-w-xs"
          />
        );
      })}
      <SizedBox height="s15" />
      {con.uploading && <LoaderIndicator />}
      {con.error && (
        <div className="flex flex-col">
          <P center secondary>
            Ocurrió un error al procesar tus documentos, por favor inténtalo
            nuevamente
          </P>
          <SizedBox height="s15" />
          <div className="flex justify-center">
            <Button variant="error" onClick={() => void con.back()}>
              Intentar nuevamente
            </Button>
          </div>
        </div>
      )}
      {con.next && (
        <div className="flex flex-col">
          <P center secondary>
            La subida de documentos se completó satisfactoriamente
          </P>
          <SizedBox height="s15" />
          <div className="mx-auto">
            <Button variant="primary" onClick={() => void con.confirm()}>
              Continuar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
