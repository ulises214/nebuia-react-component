import { FC } from 'react';

import { Optional } from '../../../../lib/common/Optional';
import {
  ParamCallback,
  VoidCallback,
} from '../../../../lib/common/VoidCallback';
import { DocumentSection } from '../../../models/Document';
import { DocumentViewFile } from './components/SelectionFile';

export type DocumentViewProps = {
  error: Optional<string>;
  isUploading: boolean;
  onFileChange: ParamCallback<Optional<File>>;
  back: VoidCallback;
  isMobile: boolean;
  section: DocumentSection;
  analyzeImage: ParamCallback<Blob, Promise<void>>;
};
export const DocumentView: FC<DocumentViewProps> = (con) => {
  return <DocumentViewFile {...con} />;
};
