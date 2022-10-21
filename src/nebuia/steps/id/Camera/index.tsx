import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Webcam from 'react-webcam';

import { Optional } from '../../../../lib/common/Optional';
import clsxm from '../../../../lib/common/utils/clsxm';
import {
  ParamCallback,
  VoidCallback,
} from '../../../../lib/common/VoidCallback';
import Button from '../../../../lib/components/atoms/buttons/Button';
import { IconButton } from '../../../../lib/components/atoms/buttons/IconButton';
import { RawButton } from '../../../../lib/components/atoms/buttons/RawButton';
import { H1, LoaderIndicator, P, SizedBox } from '../../../components/atoms';
import { Permissions, PermissionsCamera } from '../../../components/molecules';

type CaptureDocumentProps = {
  title: string;
  loading: boolean;
  capture: ParamCallback<Blob, Promise<void>>;
  close: VoidCallback;
  id: string;
  camClassName?: string;
  back: VoidCallback;
};
const videoConstraints: MediaTrackConstraints = {
  facingMode: 'environment',
  width: { min: 1280, ideal: 1920, max: 1920 },
  height: { min: 720, ideal: 1080, max: 1080 },
};
const Controls: FC<{ action: VoidCallback; close: VoidCallback }> = ({
  action,
  close,
}) => {
  return (
    <div className="absolute bottom-0 right-0 left-0 flex h-[27%] flex-col items-center justify-center rounded-t-3xl bg-black opacity-50">
      <div className="flex items-center justify-between">
        <div className="flex-shrink"></div>
        <div className="flex-shrink"></div>
        <div className="flex flex-col items-center flex-shrink-0">
          <SizedBox height="s60" width="s60">
            <RawButton
              className="p-4"
              fillcolor="white"
              onClick={() => void action()}
            />
          </SizedBox>
          <SizedBox height="s10" />
          <P className="!text-white" small>
            Pulsa para capturar imagen
          </P>
        </div>
        <div className="flex-shrink"></div>
        <SizedBox
          className="flex flex-col items-center justify-center flex-shrink-0"
          height="s30"
          width="s30"
        >
          <IconButton onClick={() => void close()}>
            <AiOutlineCloseCircle />
          </IconButton>
        </SizedBox>
      </div>
      <SizedBox height="s15" />
    </div>
  );
};

export const CaptureDocument: FC<CaptureDocumentProps> = (con) => {
  const ref = useRef<Webcam>(null);
  const [state, setState] = useState<PermissionsCamera>(
    PermissionsCamera.WAITING,
  );
  useEffect(() => {
    const devices = window.navigator.mediaDevices as Optional<MediaDevices>;
    if (!devices) {
      setState(PermissionsCamera.NO_CAMERA);
    }
    const current = ref.current;

    return () => {
      if (!current?.stream?.active) {
        return;
      }
      const tracks = current.stream.getTracks();
      current.stream = null;
      for (const track of tracks) {
        track.stop();
      }
    };
  }, []);

  const takeScreenshot = useCallback(() => {
    const context = ref.current?.getCanvas()?.getContext('2d');
    context?.canvas.toBlob(
      (blob) => {
        blob && con.capture(blob);
      },
      'image/jpeg',
      0.8,
    );
  }, [con]);

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full">
      <Webcam
        screenshotFormat="image/jpeg"
        onUserMediaError={(e) => {
          if (typeof e === 'string') {
            setState(
              e === 'Requested device not found'
                ? PermissionsCamera.NO_CAMERA
                : PermissionsCamera.REJECT,
            );
          } else {
            setState(
              [
                'Requested device not found',
                'Constraints could be not satisfied.',
              ].includes(e.message)
                ? PermissionsCamera.NO_CAMERA
                : PermissionsCamera.REJECT,
            );
          }
        }}
        onUserMedia={() => setState(PermissionsCamera.DONE)}
        playsInline
        autoPlay
        muted
        className={clsxm(
          'block !h-full !w-full object-cover',
          con.camClassName,
        )}
        ref={ref}
        videoConstraints={videoConstraints}
        audio={false}
      />
      {con.loading && (
        <div className="absolute top-12">
          <LoaderIndicator />
        </div>
      )}
      <div className="absolute flex flex-col items-start pt-5 pl-5 pr-10">
        <div className="flex justify-between w-full">
          <H1
            className={clsxm(state === PermissionsCamera.DONE && '!text-white')}
          >
            {con.title}
          </H1>
          <Button
            variant="ghost"
            className={clsxm(
              '!w-auto',
              state === PermissionsCamera.DONE && '!text-white',
            )}
            onClick={() => void con.back()}
          >
            Atrás
          </Button>
        </div>
        <P className={clsxm(state === PermissionsCamera.DONE && '!text-white')}>
          Para mejores resultados, recuerda dejar un espacio entre los laterales
          de tu documento y la cámara
        </P>
      </div>
      {state === PermissionsCamera.DONE && (
        <Controls action={takeScreenshot} close={con.close} />
      )}
      {state !== PermissionsCamera.DONE && <Permissions permission={state} />}
    </div>
  );
};
