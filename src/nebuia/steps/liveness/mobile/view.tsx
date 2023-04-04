import { FC } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

import Button from '../../../../components/atoms/buttons/Button';
import { LoaderIndicator, P, SizedBox } from '../../../components/atoms';
import { DropFileInput, ListTile } from '../../../components/molecules';
import { getBlobLink } from '../../../utils/BlobWindow';

type Props = {
  title: string;
  onCapture: (image?: File | null) => void;
  isAlive?: boolean;
  currentImage?: File | null;
  finalize: () => void;
  loading: boolean;
};

export const FaceAnalyzerMobileView: FC<Props> = (con) => {
  return (
    <>
      {!con.currentImage && (
        <P center> Por favor, toma una foto de tu rostro </P>
      )}
      {con.currentImage && con.loading && (
        <P center> Por favor, espera mientras procesamos tu rostro </P>
      )}
      <SizedBox height="s5" />
      {!con.currentImage && (
        <DropFileInput
          id="face-analyzer"
          label="Escoge una imagen o toma una foto"
          onFileChange={con.onCapture}
        />
      )}
      {con.currentImage && (
        <img
          src={getBlobLink(
            con.currentImage,
            con.currentImage.type as 'image/png',
          )}
          alt="face"
          className="h-52 w-52 rounded-full object-cover"
        />
      )}
      <SizedBox height="s5" />
      {con.currentImage && (
        <div className="flex flex-col items-center">
          {con.isAlive !== undefined && (
            <ListTile
              className="px-5 pb-4"
              leading={
                <AiFillCheckCircle
                  className={con.isAlive ? 'text-emerald-500' : 'text-red-500'}
                />
              }
              title={
                <P>
                  Prueba de vida {con.isAlive ? 'satisfactoria' : 'fallida'}
                </P>
              }
              subtitle={`La prueba de vida ${
                con.isAlive
                  ? 'se terminó satisfactoriamente'
                  : 'no se terminó satisfactoriamente'
              }`}
            />
          )}
          {con.isAlive === undefined && <LoaderIndicator />}
          {con.isAlive !== undefined && (
            <Button
              isLoading={con.loading}
              variant="primary"
              className="!w-auto"
              onClick={() => {
                if (con.isAlive) {
                  con.finalize();
                } else {
                  con.onCapture();
                }
              }}
            >
              {con.isAlive ? 'Continuar' : 'Reintentar'}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
