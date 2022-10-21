import { FC, useCallback } from 'react';

import Button from '../../../../lib/components/atoms/buttons/Button';
import NextImage from '../../../../lib/components/molecules/NextImage';
import { H1, P, SizedBox } from '../../../components/atoms';
import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { FaceAnalyzer } from '../index';

export const FaceInstruction: FC = () => {
  const indexCon = useNebuiaStepsContext();
  const next = useCallback(() => {
    indexCon.changeView(<FaceAnalyzer />);
  }, [indexCon]);

  return (
    <div className="flex flex-col">
      <SizedBox height="s35" />
      <H1 center>Tómate una foto</H1>
      <SizedBox height="s10" />
      <P center>
        Analizaremos que se trate de una persona real, cuando la prueba termine,
        verás un mensaje para continuar.
      </P>
      <SizedBox height="s15" />
      <div className="flex items-center">
        <NextImage
          src="https://i.ibb.co/TwRFBmK/icon-selfie.png"
          alt="icon selfie"
          width={40}
          height={40}
          className="w-10"
        />
        <SizedBox width="s10" />
        <P secondary center>
          Procura estar en un lugar bien iluminado, evitar reflejos y mantener
          recto tu rostro.
        </P>
      </div>
      <SizedBox height="s30" />
      <div className="flex items-center">
        <NextImage
          src="https://i.ibb.co/gybt44x/icon-mask.png"
          alt="icon mask"
          width={40}
          height={40}
          className="w-10"
        />
        <SizedBox width="s10" />
        <P secondary center>
          Si usas lentes, por favor retíralos durante el proceso de prueba de
          vida.
        </P>
      </div>
      <SizedBox height="s35" />
      <div className="mx-auto">
        <Button variant="primary" onClick={next}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};
