import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Optional } from '../../lib/common/Optional';
import { ParamCallback, VoidCallback } from '../../lib/common/VoidCallback';
import { NebuiaDocument } from '../models/Document';

interface NebuiaDocumentContextValue {
  document: NebuiaDocument;
  updateDocument: ParamCallback<Partial<NebuiaDocument>>;
  addImage: ParamCallback<{ original: Blob; image: Blob }>;
  removeImage: ParamCallback<number>;
  clearImages: VoidCallback;
  popImage: VoidCallback;
}

const NebuiaDocumentContext =
  createContext<Optional<NebuiaDocumentContextValue>>(undefined);

export const NebuiaStepsDocumentContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [document, setDocument] = useState(NebuiaDocument.i);
  const updateDocument = useCallback<
    NebuiaDocumentContextValue['updateDocument']
  >(
    ({ name, layers, hasBackLayer, section, images, imagesOriginal }) => {
      name && (document.name = name);
      layers && (document.layers = layers);
      hasBackLayer && (document.hasBackLayer = hasBackLayer);
      section && (document.section = section);
      images && (document.images = images);
      imagesOriginal && (document.imagesOriginal = imagesOriginal);
      setDocument(document);
    },
    [document],
  );
  const addImage = useCallback<NebuiaDocumentContextValue['addImage']>(
    ({ image, original }) => {
      document.images.push(image);
      document.imagesOriginal.push(original);
      setDocument(document);
    },
    [document],
  );
  const clearImages = useCallback<
    NebuiaDocumentContextValue['clearImages']
  >(() => {
    document.images = [];
    document.imagesOriginal = [];
    setDocument(document);
  }, [document]);
  const removeImage = useCallback<NebuiaDocumentContextValue['removeImage']>(
    (index) => {
      document.images.splice(index, 1);
      document.imagesOriginal.splice(index, 1);
      setDocument(document);
    },
    [document],
  );
  const popImage = useCallback<NebuiaDocumentContextValue['popImage']>(() => {
    document.images.pop();
    document.imagesOriginal.pop();
    setDocument(document);
  }, [document]);

  return (
    <NebuiaDocumentContext.Provider
      value={{
        clearImages,
        removeImage,
        addImage,
        popImage,
        document,
        updateDocument,
      }}
    >
      {children}
    </NebuiaDocumentContext.Provider>
  );
};
export const useNebuiaStepsDocumentContext = (): NebuiaDocumentContextValue =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useContext(NebuiaDocumentContext)!;
