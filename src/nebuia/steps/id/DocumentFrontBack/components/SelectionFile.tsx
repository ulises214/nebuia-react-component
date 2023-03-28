import { FC } from 'react';

import Button from '../../../../../components/atoms/buttons/Button';
import { H1, LoaderIndicator, P, SizedBox } from '../../../../components/atoms';
import { DropFileInput } from '../../../../components/molecules';
import { useNebuiaStepsDocumentContext } from '../../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../../models/Document';
import { DocumentViewProps } from '../view';

export const DocumentViewFile: FC<DocumentViewProps> = (con) => {
  const { document } = useNebuiaStepsDocumentContext();

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-sm justify-between">
        <H1>
          Parte {con.section === DocumentSection.FRONT ? 'frontal' : 'trasera'}{' '}
          de tu {document.name}
        </H1>
        <Button
          onClick={() => void con.back()}
          variant="ghost"
          className="!w-auto"
        >
          Atrás
        </Button>
      </div>
      <SizedBox height="s10" />
      <div className="p-2">
        <DropFileInput
          onFileChange={con.onFileChange}
          id={con.section.toString()}
          label={`Sube o arrastra al area punteada la imagen de la parte ${
            con.section === DocumentSection.FRONT ? 'frontal' : 'trasera'
          } de tu ${document.name === 'id' ? 'INE' : 'PASAPORTE'}`}
        />
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
