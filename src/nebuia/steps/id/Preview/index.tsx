import { FC, useCallback } from 'react';

import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { useNebuiaStepsDocumentContext } from '../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../models/Document';
import { DocumentFrontBack } from '../DocumentFrontBack';
import { UploadDocument } from '../Upload';
import { DocumentPreviewView } from './view';

export const DocumentPreview: FC<{ section: DocumentSection }> = ({
  section,
}) => {
  const { document, updateDocument, popImage } =
    useNebuiaStepsDocumentContext();
  const indexCon = useNebuiaStepsContext();
  const confirm = useCallback(() => {
    if (section === DocumentSection.FRONT && document.hasBackLayer) {
      updateDocument({ section: DocumentSection.BACK });
      indexCon.changeView(<DocumentFrontBack section={DocumentSection.BACK} />);
    } else {
      indexCon.changeView(<UploadDocument />);
    }
  }, [document.hasBackLayer, indexCon, section, updateDocument]);
  const back = useCallback(() => {
    void popImage();
    indexCon.changeView(<DocumentFrontBack section={section} />);
  }, [popImage, indexCon, section]);

  return <DocumentPreviewView {...{ confirm, back, section }} />;
};
