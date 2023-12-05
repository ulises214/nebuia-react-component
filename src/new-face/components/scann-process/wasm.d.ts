declare function _free(dst: Uint8Array): void;
declare function _malloc(size: number): Uint8Array;
declare let HEAPU8: {
  set: (dst: Uint8ClampedArray, src: Uint8Array | null) => void;
};
declare function _face_ncnn(
  dst: Uint8Array | null,
  w: number,
  h: number,
): number;
interface WasmModule {
  onRuntimeInitialized?: VoidFunction;
  wasmBinary?: ArrayBuffer;
}
