import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import {
  useCompanyDocuments,
  useDocumentCreate,
  useSignerSdks,
} from '../../../hooks/UseSignerSdks';
import { useCreatedDocuments } from '../../../hooks/UseSignerSdks/UseCreatedDocuments';
import { SignatureContextType, signerContext } from './index';

export const SignatureProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentStep, setCurrentStep] =
    useState<SignatureContextType['step']>('welcome');
  const [currentTemplate, setCurrentTemplate] = useState<string>();
  const sdk = useSignerSdks();

  const created = useCreatedDocuments({ sdk });

  const onCreatedDocument = useCallback(
    (data: { documentId: string; link: string; templateId: string }) => {
      setCurrentStep('list');
      setCurrentTemplate(undefined);
      created.append(data);
    },
    [created],
  );

  const docList = useCompanyDocuments(sdk);
  const createDocument = useDocumentCreate({
    templateSdk: sdk,
    currentTemplate,
  });

  const value = useMemo<SignatureContextType>(
    () => ({
      step: currentStep,
      chooseTemplate: (templateId) => {
        setCurrentTemplate(templateId);
        setCurrentStep('details');
      },
      currentTemplate,
      docCreateResult: createDocument[0],
      docsListResult: {
        ...docList,
        loading: docList.loading || created.loading,
      },
      goToList: () => {
        setCurrentStep('list');
        setCurrentTemplate(undefined);
      },
      createdDocuments: created.result,
      useTemplate: async () => {
        const [, create] = createDocument;
        const result = await create();
        if (!result) {
          return;
        }
        window.open(result.link, '_blank');
        onCreatedDocument(result);
      },
    }),
    [
      createDocument,
      created.loading,
      created.result,
      currentStep,
      currentTemplate,
      docList,
      onCreatedDocument,
    ],
  );

  return (
    <signerContext.Provider value={value}>{children}</signerContext.Provider>
  );
};
