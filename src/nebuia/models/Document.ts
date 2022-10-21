import { Optional } from '../../lib/common/Optional';

export const enum DocumentSection {
  FRONT,
  BACK,
}

export class NebuiaDocument {
  // eslint-disable-next-line no-use-before-define
  private static instance: Optional<NebuiaDocument>;
  name!: 'id' | 'passport';
  layers!: string[];
  hasBackLayer!: boolean;
  // helpers
  section!: DocumentSection;
  images: Blob[] = [];
  imagesOriginal: Blob[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get i(): NebuiaDocument {
    return this.instance ?? (this.instance = new NebuiaDocument());
  }
}
