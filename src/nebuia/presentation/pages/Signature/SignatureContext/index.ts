import { AdvSigTemplateDocument } from '@nebuia-ts/models';
import { createContext, useContext } from 'react';

import { PromiseCallback } from '../../../../domain/types/ParamCallback';

type SignerStep = 'welcome' | 'list' | 'details';

export type SignatureContextType = {
  step: SignerStep;
  goToList: () => void;
  currentTemplate?: string;
  chooseTemplate: (template: string) => void;
  useTemplate: PromiseCallback;
  createdDocuments: {
    documentId: string;
    link?: string;
    templateId?: string;
  }[];
  docCreateResult: {
    loading: boolean;
    result: {
      documentId: string;
      link: string;
    };
    error?: string;
  };
  docsListResult: {
    loading: boolean;
    result: (Pick<
      AdvSigTemplateDocument,
      'name' | 'description' | 'requiresKYC' | 'signsTypes'
    > & {
      id: string;
      keysToFill: {
        key: string;
        description?: string;
        place: {
          x: number;
          y: number;
          w: number;
          h: number;
          page: number;
        };
        label: string;
      }[];
    })[];
    error?: string;
  };
};
export const signerContext = createContext<SignatureContextType>(
  {} as SignatureContextType,
);

export const useSignatureContext = (): SignatureContextType => {
  return useContext(signerContext);
};
