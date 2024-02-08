import { NebuiaSignDocuments } from 'nebuia-ts/sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { PromiseCallback } from '../../../domain/types/ParamCallback';
import { SignatureContextType } from '../../pages/Signature/SignatureContext';
import { useReportSteps } from '../../providers/ReportSteps/Context';
import { useNebuiaSdk, useNebuiaUtils } from '../UseRepository';

export const useSignerSdks = (): NebuiaSignDocuments | undefined => {
  const [templateSdk, setTemplateSdk] = useState<NebuiaSignDocuments>();
  const sdk = useNebuiaSdk();

  useEffect(() => {
    void sdk.keys.then((keys) => {
      if (keys.status) {
        setTemplateSdk(() => {
          const repo = new NebuiaSignDocuments(
            import.meta.env.MODE === 'development'
              ? 'http://localhost:9853/api'
              : undefined,
          );
          repo.init(keys.payload);

          return repo;
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return templateSdk;
};

export const useCompanyDocuments = (
  sdk?: NebuiaSignDocuments,
): SignatureContextType['docsListResult'] => {
  const { onNextStep } = useReportSteps();
  const [docsListResult, setDocsListResult] = useState<
    SignatureContextType['docsListResult']
  >({
    loading: true,
    result: [],
  });

  useEffect(() => {
    if (!sdk) {
      return;
    }
    const getDocs = async () => {
      const res = await sdk.getCompanyTemplates();
      if (!res.status) {
        setDocsListResult({
          loading: false,
          result: [],
          error: res.payload,
        });

        return;
      }
      if (!res.payload.length) {
        await onNextStep();

        return;
      }

      setDocsListResult({
        loading: false,
        result: res.payload,
      });
    };

    void getDocs();
  }, [onNextStep, sdk]);

  return docsListResult;
};

export const useDocumentCreate = ({
  templateSdk,
  currentTemplate,
}: {
  templateSdk: NebuiaSignDocuments | undefined;
  currentTemplate: string | undefined;
}): readonly [
  SignatureContextType['docCreateResult'],
  PromiseCallback<
    void,
    { documentId: string; templateId: string; link: string } | undefined
  >,
] => {
  const nebuiaSdk = useNebuiaSdk();
  const nebuiaUtils = useNebuiaUtils();
  const [docsListResult, setDocsListResult] = useState<
    SignatureContextType['docCreateResult']
  >({
    loading: true,
    result: { documentId: '', link: '' },
  });

  const create = useCallback(async () => {
    if (!templateSdk || !currentTemplate) {
      return;
    }
    const report = await nebuiaUtils.existReport({
      report: nebuiaSdk.getReport(),
    });
    if (!report.status || !report.payload.email?.verified) {
      setDocsListResult({
        loading: false,
        result: {
          documentId: '',
          link: '',
        },
        error: 'Email not verified',
      });

      return;
    }
    const res = await templateSdk.createDocument({
      templateId: currentTemplate,
      email: report.payload.email.email,
      kycId: report.payload.id,
    });
    if (!res.status) {
      setDocsListResult({
        loading: false,
        result: { documentId: '', link: '' },
        error: res.payload,
      });

      return;
    }
    setDocsListResult({
      loading: false,
      result: {
        documentId: res.payload.documentId,
        link: res.payload.signatureLink,
      },
    });

    return {
      documentId: res.payload.documentId,
      link: res.payload.signatureLink,
      templateId: currentTemplate,
    };
  }, [currentTemplate, nebuiaSdk, nebuiaUtils, templateSdk]);

  const value = useMemo(
    () => [docsListResult, create] as const,
    [create, docsListResult],
  );

  return value;
};
