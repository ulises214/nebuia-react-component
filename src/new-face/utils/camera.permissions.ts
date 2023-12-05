type Result =
  | ['success', MediaStream]
  | ['deny' | 'notFound' | 'error' | 'dismissed', string];
type CheckResult = ['success' | 'deny' | 'prompt' | 'error', string];
export const checkCameraPermissions = async (): Promise<CheckResult> => {
  try {
    if (!('permissions' in navigator)) {
      return ['prompt', 'Not supported'];
    }
    const result = await navigator.permissions.query({
      name: 'camera' as PermissionName,
    });
    switch (result.state) {
      case 'granted':
        return ['success', result.state];
      case 'denied':
        return ['deny', result.state];
      case 'prompt':
        return ['prompt', result.state];
      default:
        return ['error', result.state];
    }
  } catch (e) {
    return ['error', e instanceof Error ? e.message : 'Unknown error'];
  }
};
export const getCameraPermissions = async ({
  shouldFaceUser = true,
} = {}): Promise<Result> => {
  try {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: shouldFaceUser ? 'user' : 'environment',
      },
    });

    return ['success', media];
  } catch (e) {
    if (e instanceof DOMException) {
      switch (e.name) {
        case 'NotAllowedError':
          if (e.message === 'Permission dismissed') {
            return ['dismissed', e.message];
          }

          return ['deny', e.message];
        case 'NotFoundError':
          return ['notFound', e.message];
        default:
          return ['error', e.message];
      }
    }

    return ['error', e instanceof Error ? e.message : 'Unknown error'];
  }
};
