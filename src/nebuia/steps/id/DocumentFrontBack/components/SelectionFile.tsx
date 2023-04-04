import { FC } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';

import { IconButton } from '../../../../../components/atoms/buttons/IconButton';
import { H2, LoaderIndicator, P, SizedBox } from '../../../../components/atoms';
import { DropFileInput } from '../../../../components/molecules';
import { useNebuiaStepsDocumentContext } from '../../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../../models/Document';
import { DocumentViewProps } from '../view';

export const DocumentViewFile: FC<DocumentViewProps> = (con) => {
  const { document } = useNebuiaStepsDocumentContext();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <IconButton className="!p-1" onClick={() => void con.back()}>
          <MdArrowBackIosNew className="h-4 w-4 text-black" />
        </IconButton>
        <H2 center>
          Parte {con.section === DocumentSection.FRONT ? 'frontal' : 'trasera'}{' '}
          de tu {document.name}
        </H2>
      </div>
      <SizedBox height="s10" />
      <div className="p-2">
        {!con.isUploading && (
          <DropFileInput
            onFileChange={con.onFileChange}
            id={con.section.toString()}
            label={`Sube o arrastra al area punteada la imagen de la parte ${
              con.section === DocumentSection.FRONT ? 'frontal' : 'trasera'
            } de tu ${document.name === 'id' ? 'INE' : 'PASAPORTE'}`}
          />
        )}
      </div>
      <SizedBox height="s10" />
      {con.error && (
        <SizedBox width="s400" className="rounded-sm bg-red-400 p-2 ">
          <P center small>
            {con.error}
          </P>
        </SizedBox>
      )}
      {con.isUploading && <LoaderIndicator />}
    </div>
  );
};
