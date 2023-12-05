import { useEffect, useState } from 'react';

import { FaceState } from '../store/state';
import { useFaceStore } from '../store/store';
import {
  checkCameraPermissions,
  getCameraPermissions,
} from '../utils/camera.permissions';

const getMediaStream = async (setState: (state: FaceState) => void) => {
  const result = await getCameraPermissions();
  switch (result[0]) {
    case 'success':
      setState({ type: 'scanning', event: 'idle', media: result[1] });
      break;
    case 'deny':
      setState({ type: 'permissions', step: 'denied' });
      break;
    case 'notFound':
      setState({ type: 'permissions', step: 'notFound' });
      break;
    case 'error':
      setState({ type: 'permissions', step: 'error', error: result[1] });
      break;
    case 'dismissed':
    // Do nothing
  }
};

export const useCheckCameraPermissions = (): void => {
  const { setState } = useFaceStore();

  useEffect(() => {
    void checkCameraPermissions().then((result) => {
      switch (result[0]) {
        case 'success':
          void getMediaStream(setState);
          break;
        case 'deny':
          setState({ type: 'permissions', step: 'denied' });
          break;
        case 'prompt':
          setState({ type: 'permissions', step: 'requesting' });
          break;
        case 'error':
          setState({ type: 'permissions', step: 'error', error: result[1] });
          break;
      }
    });
  }, [setState]);
};

export const useCameraPermissions = (): {
  request: VoidFunction;
  loading: boolean;
} => {
  const { setState } = useFaceStore();
  const [loading, setLoading] = useState(false);
  const request = () => {
    setLoading(true);
    void getMediaStream(setState).finally(() => {
      setLoading(false);
    });
  };

  return { request, loading };
};
