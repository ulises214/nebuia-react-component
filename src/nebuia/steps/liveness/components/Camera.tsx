import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { Optional } from '../../../../lib/common/Optional';
import clsxm from '../../../../lib/common/utils/clsxm';
import { ParamCallback } from '../../../../lib/common/VoidCallback';
import { P } from '../../../components/atoms';
import { Permissions, PermissionsCamera } from '../../../components/molecules';

type FaceAnalyzerCameraProps = {
  capture: ParamCallback<Blob, Promise<boolean>>;
  isAlive: boolean;
};
const videoConstraints: MediaStreamConstraints = {
  audio: false,
  video: true,
};
export const FaceAnalyzerCamera: FC<FaceAnalyzerCameraProps> = (con) => {
  const ref = useRef<Webcam>(null);
  const [state, setState] = useState<PermissionsCamera>(
    PermissionsCamera.WAITING,
  );
  const generateCanvas = useCallback(async (): Promise<Blob | undefined> => {
    const context = ref.current?.getCanvas()?.getContext('2d');
    if (!context?.canvas) {
      return;
    }

    return await new Promise((resolve) => {
      context.canvas.toBlob(
        (blob) => {
          blob && resolve(blob);
        },
        'image/jpeg',
        0.8,
      );
    });
  }, []);
  const takeScreenshot = useCallback(async () => {
    // generate canvas image every 2 seconds
    let scanning = true;
    while (scanning) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      // eslint-disable-next-line no-await-in-loop
      const blob = await generateCanvas();
      // eslint-disable-next-line no-await-in-loop
      const result = blob ? await con.capture(blob) : false;
      if (result) {
        scanning = false;
      }
    }
  }, [con, generateCanvas]);
  useEffect(() => {
    const load = async () => {
      const devices = window.navigator.mediaDevices as Optional<MediaDevices>;
      if (!devices) {
        setState(PermissionsCamera.NO_CAMERA);

        return;
      }
      try {
        await devices.getUserMedia(videoConstraints);
        setState(PermissionsCamera.DONE);
        await takeScreenshot();
      } catch (error) {
        if ((error as DOMException).message === 'Requested device not found') {
          setState(PermissionsCamera.NO_CAMERA);
        } else {
          setState(PermissionsCamera.REJECT);
        }
      }
    };
    void load();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (state !== PermissionsCamera.DONE) {
    return (
      <div className="flex flex-col">
        <Permissions permission={state} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center px-2">
      <P>
        Sitúate en un lugar con buena luz y coloca tu rostro en el centro de el
        circulo, éste se pondrá verde si la prueba es correcta.
      </P>
      <div className="pb-2 pt-5">
        <div
          className={clsxm(
            'aspect-square w-full max-w-xs',
            con.isAlive ? 'border-secondary-500' : 'border-primary-500',
            'rounded-[200px] border-[0.5px]',
          )}
        >
          <Webcam
            screenshotFormat="image/jpeg"
            playsInline
            autoPlay
            muted
            style={{
              borderRadius: '50%',
              WebkitTransform: 'scaleX(-1)',
              transform: 'scaleX(-1)',
            }}
            className={clsxm('block !h-full !w-full object-cover')}
            ref={ref}
            audio={false}
          />
        </div>
      </div>
    </div>
  );
};
