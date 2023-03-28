import { FC, useCallback } from 'react';

import { H1, P, SizedBox } from '../../../components/atoms';
import { SelectionID } from '../../../components/molecules';
import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { useNebuiaStepsDocumentContext } from '../../../context/NebuiaStepsDocumentContext';
import { DocumentSection } from '../../../models/Document';
import { DocumentFrontBack } from '../DocumentFrontBack';

type SelectionViewProps = {
  onID: (name: 'id' | 'passport', layers: string[], witBack: boolean) => void;
};
const SelectionView: FC<SelectionViewProps> = ({ onID }) => {
  return (
    <>
      <H1 center>Verifica tu ID</H1>
      <SizedBox height="s10" />
      <P center>Selecciona el tipo de documento que te gustaría usar</P>
      <SizedBox height="s15" />
      <div className="flex w-full flex-col p-2">
        <SelectionID
          icon="https://i.ibb.co/GTmYrwL/id-icon.png"
          title="INE"
          subtitle="Parte frontal y trasera"
          action={() => onID('id', ['mx_id_front', 'mx_id_back'], true)}
        />
        <SizedBox height="s5" />
        <SelectionID
          icon="https://i.ibb.co/JzXNvLs/passport-icon.png"
          title="Pasaporte"
          subtitle="Página con rostro"
          action={() => onID('passport', ['mx_passport_front'], false)}
        />
      </div>
    </>
  );
};
export const Selection: FC = () => {
  const { updateDocument } = useNebuiaStepsDocumentContext();
  const con = useNebuiaStepsContext();
  // set pre values for ID analyzer
  const onID = useCallback<SelectionViewProps['onID']>(
    (name, layers, witBack) => {
      updateDocument({
        name,
        layers,
        hasBackLayer: witBack,
        section: DocumentSection.FRONT,
      });
      con.changeView(<DocumentFrontBack section={DocumentSection.FRONT} />);
    },
    [con, updateDocument],
  );

  return <SelectionView onID={onID} />;
};
