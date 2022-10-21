import { FC } from 'react';

import { DoubleParamCallback } from '../../../lib/common/VoidCallback';
import Button from '../../../lib/components/atoms/buttons/Button';
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
    <div className="w-full p-1 border border-gray-400 rounded-t-sm">
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
