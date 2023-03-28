import { FC, useId } from 'react';

import { P } from '../../../../components/atoms';
import { useNebuiaStepsDocumentContext } from '../../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../../models/Document';
import { CaptureDocument } from '../../Camera';
import { DocumentViewProps } from '../view';

export const DocumentViewCamera: FC<DocumentViewProps> = (con) => {
  const { document } = useNebuiaStepsDocumentContext();
  const id = useId();

  return (
    <div className="">
      <CaptureDocument
        back={con.back}
        title={`Parte ${
          con.section === DocumentSection.FRONT ? 'frontal' : 'trasera'
        } ${document.name}`}
        capture={con.analyzeImage}
        id={id}
        close={con.back}
        loading={con.isUploading}
      />
      {con.error && (
        <div className="rounded-sm bg-red-400 p-2">
          <P center className="!text-white" small>
            {con.error}
          </P>
        </div>
      )}
    </div>
  );
};
