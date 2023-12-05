/* eslint-disable no-console */
import { NebuiaWidget } from '@nebuia-ts/sdk';
import * as wasmFeatureDetect from 'wasm-feature-detect';
import './wasm.d.ts';

import { NEBUIA_FACE_RESOURCES } from '../../constants.js';
import { FaceState } from '../../store/state';
import { useFaceStore } from '../../store/store';

let repository: NebuiaWidget;

let processComplete = false;
let dst: Uint8Array | null = null;

const w = 640;
let h = 640;

const Module: WasmModule = {};
let video: HTMLVideoElement;
let canvas: HTMLCanvasElement;
let overlay: HTMLDivElement;
let icon: SVGSVGElement;
let ctx: CanvasRenderingContext2D;
let stream: MediaStream;
let wasmModuleLoaded = false;
let stop = false;
const wasmModuleLoadedCallbacks: VoidFunction[] = [];
// @ts-expect-error - Module is not defined
window.Module = Module;

const setFaceState = (state: FaceState) => {
  useFaceStore.getState().setState(state);
};

const stopCamera = () => {
  stop = true;
  const stream = useFaceStore.getState().state;
  if (stream.type !== 'scanning') {
    return;
  }
  const script = document.getElementById('nebuia-wasm-script');
  if (script) {
    script.remove();
  }
  try {
    stream.media.getTracks().forEach((track) => {
      track.stop();
    });
  } catch (error) {
    console.error(error);
  }
};

const showQRMobile = () => {
  if (!processComplete) {
    stopCamera();
    setFaceState({ type: 'checkMobile' });
  }
};

const checkOrigin = async () => {
  if (window.location.hostname.includes('localhost')) {
    return true;
  }
  const response = await repository.getOrigin();

  if (response.status) {
    const origin = response.payload;

    if (!origin) {
      return false;
    }
    const hostFrame = document.location.ancestorOrigins[0];

    return hostFrame
      ? hostFrame.includes(origin)
      : window.location.hostname.includes('nebuia.com');
  }

  return false;
};

const domLoaded = async () => {
  // check valid origin
  const originValid = await checkOrigin();
  if (!originValid) {
    stopCamera();
    setFaceState({ type: 'invalidOrigin' });

    return;
  }
  // Wait until the video stream canvas play
  video.addEventListener(
    'canplay',
    (e) => {
      const { videoHeight, videoWidth } = e as unknown as {
        videoWidth: number;
        videoHeight: number;
      };
      // videoWidth isn't always set correctly in all browsers
      if (videoWidth > 0) {
        h = videoHeight / (videoWidth / w);
      }
      canvas.setAttribute('width', w.toString());
      canvas.setAttribute('height', h.toString());
    },
    false,
  );

  // Wait for the video to start to play
  video.addEventListener('play', function () {
    const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    initUpdateFrame(id.data);
  });
};
let processInit = false;
export const initWebcam = async (args: {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  overlay: HTMLDivElement;
  icon: SVGSVGElement;
  sdk: NebuiaWidget;
  media: MediaStream;
}): Promise<void> => {
  if (processInit) {
    return;
  }
  processInit = true;
  repository = args.sdk;
  const ctx2 = args.canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx2) {
    throw new Error('Canvas not supported');
  }
  video = args.video;
  canvas = args.canvas;
  overlay = args.overlay;
  icon = args.icon;
  ctx = ctx2;
  stream = args.media;
  // @ts-expect-error - stream is not defined
  window.stream = stream;
  await domLoaded();
};

const ncnnFace = async () => {
  return new Promise<void>((resolve) => {
    HEAPU8.set(ctx.getImageData(0, 0, canvas.width, canvas.height).data, dst);
    _face_ncnn(dst, canvas.width, canvas.height);

    resolve();
  });
};

const sFilter = () => {
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(video, 0, 0, w, h);

  if (!processComplete) {
    void ncnnFace().then(() => {
      if (!stop) {
        requestAnimationFrame(sFilter);
      }
    });
  }
};

let detecting = false;

Module['onRuntimeInitialized'] = function () {
  wasmModuleLoaded = true;
  for (const element of wasmModuleLoadedCallbacks) {
    element();
  }
};

void wasmFeatureDetect.simd().then(async (simdSupported) => {
  const module = simdSupported ? 'face-simd' : 'face-basic';
  const URL = `${NEBUIA_FACE_RESOURCES}/${module}`;
  const response = await fetch(`${URL}.wasm`);
  const buffer = await response.arrayBuffer();
  Module.wasmBinary = buffer;
  const script = document.createElement('script');
  script.id = 'nebuia-wasm-script';
  script.src = `${URL}.js`;
  // eslint-disable-next-line no-console
  script.onload = () => console.log('Emscripten boilerplate loaded.');
  document.body.appendChild(script);
});

function initUpdateFrame(d: Uint8ClampedArray) {
  if (wasmModuleLoaded) {
    mallocAndCallSFilter();
  } else {
    wasmModuleLoadedCallbacks.push(mallocAndCallSFilter);
  }

  function mallocAndCallSFilter() {
    if (dst !== null) {
      _free(dst);
      dst = null;
    }

    dst = _malloc(d.length);
    sFilter();

    setTimeout(showQRMobile, 40_000);
  }
}

const getBlob = () => {
  const dataURL = canvas.toDataURL('image/jpeg', 0.75);
  const binary = atob(dataURL.split(',')[1] as string);
  const bytes = Array.from(binary, (char) => char.charCodeAt(0));

  return new Blob([new Uint8Array(bytes)], { type: 'image/jpeg' });
};

function onFaceResult(
  nosePosition: string,
  _faceAction: string,
  _ratio: number,
  numberFaces: number,
) {
  if (useFaceStore.getState().state.type !== 'scanning') {
    return;
  }
  if (nosePosition === 'center') {
    setFaceState({
      ...useFaceStore.getState().state,
      event: 'faceCentered',
    });
  } else {
    setFaceState({
      ...useFaceStore.getState().state,
      event: 'faceMoved',
    });
  }
  if (
    !processComplete &&
    !detecting &&
    numberFaces === 1 &&
    nosePosition === 'center'
  ) {
    void processFrame();
  }
}
// @ts-expect-error - onFaceResult is not defined
window.onFaceResult = onFaceResult;

const quality = async (blob: Blob) => {
  const response = await repository.qualityFace(blob);

  return response.status ? response.payload : 0.0;
};
const proof = async (blob: Blob) => {
  const response = await repository.analiceFace(blob);

  return response.status ? response.payload.status : false;
};

async function processFrame() {
  detecting = true;
  const blob = getBlob();
  const qualityScore = await quality(blob);

  if (qualityScore > 50) {
    processComplete = await proof(blob);
    if (processComplete) {
      onComplete();
    }
  }

  detecting = false;
}

function onComplete() {
  processComplete = true;
  overlay.style.display = 'block';
  icon.style.display = 'block';
  stopCamera();
  setFaceState({ type: 'complete' });
  if (document.location.ancestorOrigins[0]) {
    parent.postMessage({ status: true }, document.location.ancestorOrigins[0]);
  }
}
