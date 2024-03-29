import { FC } from 'react';

import Button from '../../../components/atoms/buttons/Button';
import { Optional } from '../../../lib/common/Optional';
import {
  DoubleParamCallback,
  ParamCallback,
  VoidCallback,
} from '../../../lib/common/VoidCallback';
import { LoaderIndicator, P, SizedBox } from '../../components/atoms';
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
    <>
      {con.showUploadElement && (
        <>
          <P center>
            Sube un comprobante de domicilio no mayor a 3 meses de antigüedad
          </P>
          <SizedBox height="s35" />
        </>
      )}
      <div className="flex w-full flex-col justify-center bg-nebuia-primary-200/20 px-3 py-2 text-center">
        <div className="">
          <p className="text-sm font-light text-slate-600 ">
            Sólo se admiten recibos de:
          </p>
        </div>
        <p className="text-sm font-semibold text-slate-600">
          CFE, IZZI y TELMEX.
        </p>
      </div>
      <SizedBox height="s35" />
      {con.editAddress && (
        <EditAddress
          {...{
            address: con.address ?? {},
            index: con.index,
            setAddress: con.setAddress,
          }}
        />
      )}
      {con.showUploadElement && !con.loading && (
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
        <div className="w-full rounded-sm bg-red-400 p-2">
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
        <div className="flex w-full flex-col-reverse justify-evenly gap-6 xs:flex-row">
          <Button center variant="outline" onClick={() => void con.back()}>
            Subir otro documento
          </Button>
          <Button center variant="primary" onClick={() => void con.next()}>
            Siguiente
          </Button>
        </div>
      )}
    </>
  );
};
