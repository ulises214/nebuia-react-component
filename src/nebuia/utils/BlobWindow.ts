import { Optional } from '../../lib/common/Optional';

enum BlobType {
  'application/pdf',
  'image/png',
}
type BlobKey = keyof typeof BlobType;

export const removeBlobLink = (url: string): void => {
  URL.revokeObjectURL(url);
};
export const getBlobLink = (
  blob: ArrayBuffer | Blob,
  type: BlobKey,
): string => {
  const file = blob instanceof Blob ? blob : new Blob([blob], { type });
  const fileURL = URL.createObjectURL(file);

  return fileURL;
};
export const downloadBlob = (
  blob: ArrayBuffer,
  type: BlobKey,
  fileName: string,
): void => {
  const url = getBlobLink(blob, type);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  removeBlobLink(url);
};
export const optionalBlobLink = (
  blob: Optional<ArrayBuffer | Blob>,
  type: BlobKey,
): Optional<string> => {
  if (!blob) {
    return;
  }

  return getBlobLink(blob, type);
};

export const getBlobFromBase64 = (base64: string): Blob | undefined => {
  try {
    const buffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    return new Blob([buffer], { type: 'image/jpeg' });
  } catch (e) {
    return undefined;
  }
};
