import { FC, useCallback, useState } from 'react';

import { Optional } from '../../../lib/common/Optional';
import { useNebuiaStepsContext } from '../../context/NebuiaStepsContext';
import { Address as AddressI } from '../../models/Address';
import { NebuiaApiRepository } from '../../repository/ApiRepository';
import { AddressView } from './view';

export const Address: FC = () => {
  const [_isUploading, setIsUploading] = useState(false);
  const [addressSelected, setAddressSelected] =
    useState<Optional<string>>(undefined);
  const indexCon = useNebuiaStepsContext();
  const [showNext, setShowNext] = useState(false);
  const [error, setError] = useState<Optional<string>>(undefined);
  const [showError, setShowError] = useState(false);
  // Uploading
  // const [percent, setPercent] = useState(0);
  // Address
  const [address, setAddressI] = useState<Optional<AddressI>>(undefined);
  const [editAddress, setEditAddress] = useState(false);
  const [editInputAddress, setEditInputAddress] = useState(false);
  const [addressNotFound, setAddressNotFound] = useState(false);
  const [showUploadElement, setShowUploadElement] = useState(true);
  // On edit
  const [index, setIndex] = useState(-1);
  const _showError = useCallback((error: string) => {
    setError(error);
    setShowError(true);
    setTimeout(() => {
      setError(undefined);
      setShowError(false);
    }, 3000);
  }, []);
  // save address to user report
  const saveAddress = useCallback(
    async (address: AddressI) => {
      await NebuiaApiRepository.saveAddress({
        keys: indexCon.keys,
        report: indexCon.kyc,
        address,
      });
    },
    [indexCon.keys, indexCon.kyc],
  );
  const _editAddress = useCallback(() => {
    // show error on extract address
    setShowUploadElement(false);
    setAddressNotFound(true);
    setEditInputAddress(true);
    setShowNext(true);
  }, []);
  const _upload = useCallback(
    async (file: File) => {
      const ext = file.type.split('/')[1];
      // show loading indicator
      setIsUploading(true);
      // call api service for address extraction
      const response = await NebuiaApiRepository.getAddress({
        keys: indexCon.keys,
        report: indexCon.kyc,
        img: file,
        isPDF: ext === 'pdf',
      });
      if (response.status && response.payload.valid) {
        await saveAddress(response.payload);
        setAddressI(response.payload);
        setShowUploadElement(false);
        setAddressNotFound(false);
        setEditAddress(true);
      } else {
        _editAddress();
      }
      // hide loading indicator
      setIsUploading(false);
    },
    [_editAddress, indexCon.keys, indexCon.kyc, saveAddress],
  );
  const _fillFile = useCallback(
    async (file: File) => {
      // support image and pdf file types
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'application/pdf'
      ) {
        await _upload(file);
      } else {
        _showError('Tipo de archivo no admitido');
      }
    },
    [_showError, _upload],
  );
  ///address selection
  const setAddress = useCallback((address: string, index: number) => {
    setIndex(index);
    setShowNext(true);
    setAddressSelected(address);
    setAddressI({ address: [address] });
    setEditAddress(false);
  }, []);
  // next screen step
  const next = useCallback(async () => {
    if (!addressSelected?.trim()) {
      return;
    }
    await saveAddress({
      address: [addressSelected],
      exact: true,
    });
    indexCon.finishStep();
  }, [addressSelected, indexCon, saveAddress]);
  const back = useCallback(() => {
    setAddressI(undefined);
    setShowUploadElement(true);
    setAddressNotFound(false);
    setEditAddress(false);
    setEditInputAddress(false);
    setShowNext(false);
  }, []);

  const onFile = useCallback(
    (file: Optional<File>) => {
      file && _fillFile(file);
    },
    [_fillFile],
  );

  return (
    <AddressView
      {...{
        addressSelected,
        setAddressSelected,
        editAddress,
        onFile,
        address,
        setAddress,
        loading: _isUploading,
        next,
        back,
        showNext,
        showError,
        error,
        showUploadElement,
        addressNotFound,
        editInputAddress,
        index,
      }}
    />
  );
};
