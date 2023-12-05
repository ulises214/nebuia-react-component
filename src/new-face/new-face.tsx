import { useEffect } from 'react';

import { LivenessQr } from '../nebuia/presentation/steps/liveness/LivenessQr';
import { initI18n } from '../translations/initi18';
import { FaceComplete } from './components/complete';
import { FaceIdle, FacePermissions } from './components/permissions';
import { ScanFace } from './components/scan';
import { faceStateMaybeWhen } from './store/state';
import { useFaceStore } from './store/store';

export const NebuiaFace = () => {
  const { state } = useFaceStore();
  useEffect(() => {
    void initI18n('es');
  }, []);

  return faceStateMaybeWhen(state, {
    permissions(state) {
      return <FacePermissions state={state} />;
    },
    idle() {
      return <FaceIdle />;
    },
    scanning(state) {
      return <ScanFace state={state} />;
    },
    complete() {
      return <FaceComplete />;
    },
    checkMobile() {
      return <LivenessQr fromChoice={false} />;
    },
    invalidOrigin() {
      return <div>invalid origin</div>;
    },
    orDefault() {
      return <div>default</div>;
    },
  });
};
