import { FC } from 'react';

import { Optional } from '../../../../lib/common/Optional';
import { DoubleParamCallback } from '../../../../lib/common/VoidCallback';
import { P, SizedBox } from '../../../components/atoms';
import { AddressItem } from '../../../components/molecules';
import { Address } from '../../../models/Address';

type EditAddressProps = {
  address: Optional<Address>;
  setAddress: DoubleParamCallback<string, number>;
  index: number;
};

export const EditAddress: FC<EditAddressProps> = (con) => {
  return (
    <div className="flex flex-col px-2">
      <P center secondary>
        Encontramos {con.address?.address?.length ?? 0} direcciones en tu
        comprobante, por favor selecciona la correcta.
      </P>
      <SizedBox height="s15" />
      {con.address?.address?.map((address, index) => {
        return (
          <AddressItem
            key={index}
            {...{
              action: con.setAddress,
              index,
              active: con.index === index,
              content: address,
            }}
          ></AddressItem>
        );
      })}
    </div>
  );
};
