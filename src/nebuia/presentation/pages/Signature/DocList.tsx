import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { GradientCircle } from '../../../../common/presentation/components/atoms/GradientCircle';
import { P } from '../../../../common/presentation/components/atoms/P';
import { CardTile } from '../../../../common/presentation/components/molecules/CardTile';
import { useSignatureContext } from './SignatureContext';

export const SignDocumentList = () => {
  const { docsListResult, createdDocuments, chooseTemplate } =
    useSignatureContext();
  const { t } = useTranslation();

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <P className="max-w-xs text-center font-bold">
        {t('pages.signatureWelcome.shortDescription')}
      </P>
      {docsListResult.result.map((doc) => {
        const completed = createdDocuments.find((d) => d.templateId === doc.id);
        const disabled = completed && !completed.link;

        return (
          <CardTile
            disabled={disabled}
            onClick={() => {
              if (!completed) {
                chooseTemplate(doc.id);
              }
              if (completed) {
                window.open(completed.link, '_blank');
              }
            }}
            isActive={!!completed}
            key={doc.id}
            title={doc.name}
            icon={<GradientCircle />}
            suffix={
              completed ? (
                <CheckCircleIcon className="text-nebuia-primary-500" />
              ) : undefined
            }
            subTitle={
              (doc.description?.length ?? 0) > 40
                ? `${doc.description?.substring(0, 40)}...`
                : doc.description
            }
          />
        );
      })}
    </div>
  );
};
