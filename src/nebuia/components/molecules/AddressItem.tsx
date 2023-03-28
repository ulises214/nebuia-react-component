import { FC } from 'react';

import Button from '../../../components/atoms/buttons/Button';
import { DoubleParamCallback } from '../../../lib/common/VoidCallback';
import { P } from '../atoms';
import { ListTile } from './ListTile';

type AddressItemProps = {
  index: number;
  content: string;
  active: boolean;
  action: DoubleParamCallback<string, number>;
};
export const AddressItem: FC<AddressItemProps> = (props) => {
  return (
    <div className="w-full rounded-t-sm border border-gray-400 p-1">
      <ListTile
        className="p-1"
        title={<P small>{props.content}</P>}
        trailing={
          <Button
            variant="ghost"
            onClick={() => props.action(props.content, props.index)}
          >
            Seleccionar
          </Button>
        }
      />
    </div>
  );
};
