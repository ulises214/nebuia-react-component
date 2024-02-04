import Button from '@components/atoms/buttons/Button';
import { Alert } from '@components/molecules/Alert';
import { InlineInputFile } from '@components/molecules/inputs/InlineFileInput';
import { DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';
import {
  useCreditsCompanyContext,
  useCreditsEnrollmentInfoContext,
  useCreditsStepContext,
} from '@nebuia-services/credits/context/credits-context';
import clsxm from '@utils/clsxm';
import { useCallback, useEffect, useState } from 'react';

import { SectionWrapper } from '../SectionWrapper';

export const DocumentsCreditEnrollment = () => {
  const { onNextStep } = useCreditsStepContext();
  const [firstRender, setFirstRender] = useState(true);
  const { company } = useCreditsCompanyContext();
  const [documents, setDocuments] = useState<{
    [keys: string]: File;
  }>({});
  const { setData } = useCreditsEnrollmentInfoContext();
  const [error, setError] = useState<string>();

  const companyDocs = company?.settings.credit.collaborator_document_config;

  const validate = useCallback(() => {
    if (!companyDocs) {
      return false;
    }
    const allUploaded = companyDocs.every((doc) => {
      return documents[doc.document_name];
    });
    if (!allUploaded) {
      setError('Todos los documentos son requeridos');

      return false;
    }
    setError(undefined);

    return true;
  }, [companyDocs, documents]);

  useEffect(() => {
    validate();
  }, [documents, validate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setFirstRender(false);
    e.preventDefault();
    const valid = validate();
    if (!valid) {
      return;
    }

    setData({
      files: Object.entries(documents)
        .map(([name, file]) => {
          const companyDoc = companyDocs?.find(
            (doc) => doc.document_name === name,
          );
          if (!companyDoc) {
            return undefined;
          }

          return {
            name,
            file,
          };
        })
        .filter(Boolean),
    });

    onNextStep();
  };

  if (!companyDocs) {
    return null;
  }

  const changeFile =
    (docName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        setDocuments((prev) => {
          delete prev[docName];

          return prev;
        });

        return;
      }

      setDocuments({
        ...documents,
        [docName]: file,
      });
    };

  return (
    <SectionWrapper>
      {error && (
        <Alert variant={firstRender ? 'info' : 'error'} message={error} />
      )}
      <form onSubmit={onSubmit} className="space-y-2">
        {companyDocs.map((doc) => {
          const documentLoaded = !!documents[doc.document_name];

          return (
            <div
              key={doc.document_name}
              className={clsxm('flex gap-2 items-center px-2 py-1 rounded-lg', {
                'bg-nebuia-primary-500/10': documentLoaded,
              })}
            >
              {doc.document_type === 'PDF' ? (
                <DocumentIcon className="size-4" />
              ) : (
                <PhotoIcon className="size-4" />
              )}
              <InlineInputFile
                label={doc.document_name}
                accept={
                  doc.document_type === 'Image'
                    ? 'image/png,image/jpeg'
                    : 'application/pdf'
                }
                onChange={changeFile(doc.document_name)}
                onAbort={() => {
                  setDocuments((prev) => {
                    delete prev[doc.document_name];

                    return prev;
                  });
                }}
              />
            </div>
          );
        })}
        <div className="w-full flex justify-end">
          <Button variant="primary" type="submit" className="!py-1.5">
            Enviar
          </Button>
        </div>
      </form>
    </SectionWrapper>
  );
};
