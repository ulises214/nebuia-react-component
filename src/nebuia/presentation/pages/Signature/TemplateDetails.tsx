import { AdvancedSignType } from '@nebuia-ts/models';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { P } from '../../../../common/presentation/components/atoms/P';
import { Alert } from '../../../../common/presentation/components/molecules/Alert';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import clsxm from '../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { DOC_ICON } from './images';
import { useSignatureContext } from './SignatureContext';

const SignExplanation: FC<{ signs: AdvancedSignType[] }> = ({ signs }) => {
  const { t } = useTranslation();
  const { dark } = useTheme().theme;

  return (
    <div className="flex flex-col items-center">
      <div className="px-4 sm:px-0">
        <P className="max-w-xs text-center">{t('signature.title')}</P>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {[...signs]
            .sort((a, b) => a.localeCompare(b))
            .map((sign) => {
              return (
                <div
                  key={sign}
                  className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                  <dt
                    className={clsxm('text-sm font-bold leading-6', {
                      'text-gray-900': !dark,
                      'text-gray-400': dark,
                    })}
                  >
                    {t(`signature.types.${sign}.title`)}
                  </dt>
                  <dd
                    className={clsxm(
                      'mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0',
                      {
                        'text-gray-700': !dark,
                        'text-gray-200': dark,
                      },
                    )}
                  >
                    {t(`signature.types.${sign}.description`)}
                  </dd>
                </div>
              );
            })}
        </dl>
      </div>
    </div>
  );
};

export const TemplateDetails = () => {
  const { t } = useTranslation();
  const {
    goToList,
    currentTemplate,
    docsListResult,
    useTemplate,
    docCreateResult,
  } = useSignatureContext();

  useControlButton({
    action: goToList,
    label: t('pages.genericWelcome.startButton'),
    side: 'previous',
  });

  const nextLabel = useMemo(() => {
    if (docCreateResult.error) {
      return t('common.retry');
    }

    return t('common.continue');
  }, [docCreateResult.error, t]);

  useControlButton({
    action: useTemplate,
    label: nextLabel,
    side: 'next',
  });

  if (!currentTemplate) {
    return null;
  }

  const template = docsListResult.result.find(
    (doc) => doc.id === currentTemplate,
  );

  if (!template) {
    return null;
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <picture>
        <img src={DOC_ICON} alt="" />
      </picture>
      <P className="text-center text-lg font-bold">{template.name}</P>
      {template.description && (
        <P className="text-center">{template.description}</P>
      )}
      <SignExplanation signs={template.signsTypes} />
      {docCreateResult.error && (
        <Alert
          variant="error"
          title={t('signature.createResult.error.title')}
          message={t('signature.createResult.error.message')}
        />
      )}
    </div>
  );
};
