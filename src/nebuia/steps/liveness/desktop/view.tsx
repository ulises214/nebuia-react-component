import { FC } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

import Button from '../../../../components/atoms/buttons/Button';
import {
  ParamCallback,
  VoidCallback,
} from '../../../../lib/common/VoidCallback';
import { LoaderIndicator, P, SizedBox } from '../../../components/atoms';
import { ListTile } from '../../../components/molecules';
import { FaceAnalyzerCamera } from './components/Camera';

type FaceAnalyzerProps = {
  title: string;
  capture: ParamCallback<Blob, Promise<boolean>>;
  isAlive: boolean;
  finalize: VoidCallback;
  image?: Blob;
};
export const FaceAnalyzerView: FC<FaceAnalyzerProps> = (con) => {
  return (
    <>
      {!con.isAlive && (
        <P center>Por favor espera, estamos procesando tu rostro</P>
      )}
      <SizedBox height="s5" />
      <FaceAnalyzerCamera
        image={con.image}
        isAlive={con.isAlive}
        capture={con.capture}
      />
      <SizedBox height="s5" />
      {con.isAlive && (
        <div className="mx-auto flex max-w-md flex-col items-center">
          <ListTile
            className="px-5 pb-4"
            leading={<AiFillCheckCircle className="text-emerald-500" />}
            title={<P>Prueba de vida satisfactoria</P>}
            subtitle="La prueba de vida se terminó satisfactoriamente"
          />
          <Button
            variant="primary"
            className="!w-auto"
            onClick={() => void con.finalize()}
          >
            Finalizar
          </Button>
        </div>
      )}
      {!con.isAlive && <LoaderIndicator />}
    </>
  );
};
