import { FC } from 'react';

import { Optional } from '../../../lib/common/Optional';
import {
  DoubleParamCallback,
  ParamCallback,
  VoidCallback,
} from '../../../lib/common/VoidCallback';
import Button from '../../../lib/components/atoms/buttons/Button';
import { H1, LoaderIndicator, P, SizedBox } from '../../components/atoms';
import { AddressInput, DropFileInput } from '../../components/molecules';
import { Address } from '../../models/Address';
import { EditAddress } from './components/EditAddress';

type AddressViewProps = {
  editAddress: boolean;
  onFile: ParamCallback<Optional<File>>;
  loading: boolean;
  setAddress: DoubleParamCallback<string, number>;
  next: VoidCallback;
  back: VoidCallback;
  showNext: boolean;
  showError: boolean;
  error: Optional<string>;
  showUploadElement: boolean;
  addressNotFound: boolean;
  editInputAddress: boolean;
  index: number;
  address: Optional<Address>;
  addressSelected: Optional<string>;
  setAddressSelected: ParamCallback<Optional<string>>;
};
export const AddressView: FC<AddressViewProps> = (con) => {
  return (
    <div className="flex flex-col items-center">
      <SizedBox height="s35" />
      <H1 center>Comprobante de domicilio</H1>
      <SizedBox height="s10" />
      {con.editAddress && (
        <EditAddress
          {...{
            address: con.address ?? {},
            index: con.index,
            setAddress: con.setAddress,
          }}
        />
      )}
      {con.showUploadElement && (
        <DropFileInput
          {...{
            onFileChange: con.onFile,
            id: 'address_file',
            label:
              'Sube o arrastra al área punteada tu comprobante en imagen o PDF',
          }}
        />
      )}
      <SizedBox height="s5" />
      {con.showError && (
        <div className="w-full p-2 bg-red-400 rounded-sm">
          <P center className="!text-white" small>
            {con.error ?? 'Error'}
          </P>
        </div>
      )}
      {con.loading && <LoaderIndicator />}
      {con.editInputAddress && (
        <div className="flex flex-col items-center px-2">
          <P justify>
            {con.addressNotFound
              ? 'No pudimos encontrar una dirección en el archivo proporcionado, por sube otro documento o ingrésala manualmente.'
              : 'Si requieres editar tu dirección puedes hacerlo en el siguiente formulario.'}
          </P>
          <SizedBox height="s10" />
          <div className="px-4">
            <AddressInput
              value={con.addressSelected ?? ''}
              write={con.setAddressSelected}
            />
          </div>
          <SizedBox height="s10" />
        </div>
      )}
      {con.showNext && (
        <div className="flex flex-col w-full gap-6 justify-evenly xs:flex-row">
          <Button center variant="outline" onClick={() => void con.back()}>
            Subir otro documento
          </Button>
          <Button center variant="primary" onClick={() => void con.next()}>
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
};
