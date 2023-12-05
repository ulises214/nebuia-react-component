import { MaybeWhen } from '../utils/maybe-when';

export type FaceStatePermissions = { type: 'permissions' } & (
  | { step: 'requesting' | 'denied' | 'notFound' }
  | { step: 'error'; error: string }
);
export type FaceStateScanning = {
  type: 'scanning';
  media: MediaStream;
} & (
  | { event: 'faceCentered' | 'faceMoved' | 'idle' }
  | { event: 'faceError'; error: string }
);
export type FaceStateComplete = { type: 'complete' };
export type FaceIdleState = { type: 'idle' };
export type FaceCheckMobile = { type: 'checkMobile' };
export type FaceInvalidOrigin = { type: 'invalidOrigin' };
export type FaceState =
  | FaceStatePermissions
  | FaceStateScanning
  | FaceIdleState
  | FaceStateComplete
  | FaceCheckMobile
  | FaceInvalidOrigin;

type FaceStateMaybeWhen<T> = MaybeWhen<FaceState, T>;

export const faceStateMaybeWhen = <T>(
  state: FaceState,
  fns: Parameters<FaceStateMaybeWhen<T>>[1],
): T => {
  const { type } = state;
  const { orDefault, ...rest } = fns;
  const handler = rest[type] as ((state: FaceState) => T) | undefined;
  const fn = handler ?? orDefault;

  return fn(state);
};
