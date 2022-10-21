import { FC, useCallback, useEffect, useState } from 'react';

import { Optional } from '../../../../lib/common/Optional';
import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { useNebuiaStepsDocumentContext } from '../../../context/NebuiaStepsDocumentContext';
import { NebuiaApiRepository } from '../../../repository/ApiRepository';
import { Selection } from '../Selection';
import { UploadDocumentView } from './view';

export const UploadDocument: FC = () => {
  const { document, clearImages } = useNebuiaStepsDocumentContext();
  const indexCon = useNebuiaStepsContext();
  const [error, setError] = useState<Optional<string>>(undefined);
  const [uploading, setUploading] = useState(true);
  const [firsRender, setFirsRender] = useState(true);
  const [next, setNext] = useState(false);
  // upload front and back? images from ID
  const _uploadDocuments = useCallback(async () => {
    setFirsRender(false);
    const response = await NebuiaApiRepository.uploadID({
      document,
      keys: indexCon.keys,
      report: indexCon.kyc,
    });
    setUploading(false);
    if (!response.status) {
      setError('Error al subir documento.');
      setNext(false);

      return;
    }
    setNext(true);
    setError(undefined);
  }, [document, indexCon.keys, indexCon.kyc]);
  useEffect(() => {
    if (!firsRender) {
      return;
    }
    void _uploadDocuments();
  }, [_uploadDocuments, firsRender]);
  // remove images from memory
  const _clearAll = useCallback(() => {
    void clearImages();
    setError(undefined);
    setUploading(true);
    setNext(false);
  }, [clearImages]);
  // pass to next KYC step
  const confirm = useCallback(() => {
    _clearAll();
    void indexCon.finishStep();
  }, [_clearAll, indexCon]);
  // re upload all documents
  const back = useCallback(() => {
    _clearAll();
    indexCon.changeView(<Selection />);
  }, [_clearAll, indexCon]);

  return <UploadDocumentView {...{ confirm, back, error, next, uploading }} />;
};
