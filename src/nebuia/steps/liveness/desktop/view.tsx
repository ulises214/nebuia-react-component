import { FC } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

import Button from '../../../../components/atoms/buttons/Button';
import {
  ParamCallback,
  VoidCallback,
} from '../../../../lib/common/VoidCallback';
import { H1, P, SizedBox } from '../../../components/atoms';
import { ListTile } from '../../../components/molecules';
import { FaceAnalyzerCamera } from './components/Camera';

type FaceAnalyzerProps = {
  title: string;
  capture: ParamCallback<Blob, Promise<boolean>>;
  isAlive: boolean;
  finalize: VoidCallback;
};
export const FaceAnalyzerView: FC<FaceAnalyzerProps> = (con) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <SizedBox height="s35" />
      <H1 center>{con.title}</H1>
      <SizedBox height="s10" />
      <FaceAnalyzerCamera isAlive={con.isAlive} capture={con.capture} />
      <SizedBox height="s5" />
      {con.isAlive && (
        <div className="flex flex-col items-center">
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
    </div>
  );
};
