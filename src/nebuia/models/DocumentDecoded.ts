interface DocumentDecodedValid {
  readonly type: string;
  readonly image: Blob;
  readonly valid: true;
}
interface DocumentDecodedInValid {
  readonly valid: false;
}
export type DocumentDecoded = DocumentDecodedValid | DocumentDecodedInValid;

export class DocumentDecodedUtils {
  static fromJson(
    json: { image: string; type: string } | string,
  ): DocumentDecoded {
    const valid = typeof json !== 'string';
    if (typeof json === 'string') {
      return { valid: false };
    }
    const buffer = json.image
      ? Uint8Array.from(atob(json['image']), (c) => c.charCodeAt(0))
      : new Uint8Array().buffer;

    return {
      type: json.type || '',
      image: new Blob([buffer], { type: 'image/jpeg' }),
      valid,
    };
  }
}
