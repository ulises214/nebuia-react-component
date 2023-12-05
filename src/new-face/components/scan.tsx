/* eslint-disable jsx-a11y/media-has-caption */
import { CheckIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './scan.module.css';

import { Alert } from '../../common/presentation/components/molecules/Alert';
import clsxm from '../../common/presentation/utils/clsxm';
import { useNebuiaSdk } from '../../nebuia/presentation/hooks/UseRepository';
import { FaceStateScanning } from '../store/state';
import { initWebcam } from './scann-process';

export const Idle = () => {
  const { t } = useTranslation();

  return (
    <Alert
      variant="info"
      title={t('newFace.scanning.idle.title')}
      message={t('newFace.scanning.idle.message')}
    />
  );
};
const ScanFaceContent: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <>
      {children}
      <Idle />
    </>
  );
};
const FaceInstructions = ({ event }: { event: FaceStateScanning['event'] }) => {
  const { t } = useTranslation();
  const message = t(`newFace.scanning.events.${event}`);

  return (
    <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-500/50 p-1">
      <span className="text-sm text-white">{message}</span>
    </div>
  );
};

export const ScanFace: FC<{ state: FaceStateScanning }> = ({ state }) => {
  const sdk = useNebuiaSdk();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !overlayRef.current ||
      !iconRef.current
    ) {
      return;
    }
    void initWebcam({
      canvas: canvasRef.current,
      icon: iconRef.current,
      sdk,
      media: state.media,
      overlay: overlayRef.current,
      video: videoRef.current,
    }).then(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = state.media;
        videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      }
    });
  }, [sdk, state.media]);

  return (
    <div className="flex flex-col items-center gap-4">
      <ScanFaceContent>
        <>
          <div
            className={clsxm(
              styles['video-container'],
              'border-[3px] border-solid',
              state.event === 'faceCentered' && 'border-emerald-500',
              state.event === 'faceError' && 'border-red-500',
              state.event === 'faceMoved' && 'border-amber-500',
              state.event === 'idle' && 'border-gray-500',
            )}
          >
            <FaceInstructions event={state.event} />
            <video
              ref={videoRef}
              id="nebuia-face-video"
              playsInline
              autoPlay
              className={clsxm('relative')}
            ></video>
            <div ref={overlayRef} className={styles['overlay']}>
              <CheckIcon ref={iconRef} className={styles['icon']} />
            </div>
          </div>
          <canvas
            ref={canvasRef}
            id="nebuia-face-canvas"
            className={styles['canvas']}
            width="640"
          ></canvas>
        </>
      </ScanFaceContent>
    </div>
  );
};
