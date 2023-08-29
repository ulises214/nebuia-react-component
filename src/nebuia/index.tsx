import { NebuiaKeys } from '@nebuia-ts/models';
import { FC, useEffect, useState } from 'react';

import { Loader } from '../common/presentation/components/atoms/Loader';
import { Layout } from '../common/presentation/components/layouts/Layout';
import { ControlActionsProvider } from '../common/presentation/providers/ControlActionsProvider';
import { CurrentViewProvider } from '../common/presentation/providers/CurrentViewProvider';
import { useCurrentView } from '../common/presentation/providers/CurrentViewProvider/Context';
import { ThemeProvider } from '../theme/presentation/providers/ThemeProvider';
import { initI18n, Lang } from '../translations/initi18';
import { WidgetProps } from './domain/types/WidgetProps';
import { GenericWelcomePage } from './presentation/pages/GenericWelcomePage';
import { SignatureWelcomePage } from './presentation/pages/SignatureWelcomePage';
import { CompanyStepsProvider } from './presentation/providers/CompanySteps';
import { ReportStepsProvider } from './presentation/providers/ReportSteps';
import { NebuiaSdkProvider } from './presentation/providers/RepositoryProvider';
import { WidgetConfigProvider } from './presentation/providers/WidgetConfig';
import { useWidgetConfig } from './presentation/providers/WidgetConfig/Context';

const Content: FC<{
  keys: NebuiaKeys;
  kyc?: string;
}> = ({ keys, kyc }) => {
  const { currentView } = useCurrentView();
  const { isForSignaturePage, enableWidgetBackground } = useWidgetConfig();

  return (
    <NebuiaSdkProvider keys={keys} kyc={kyc}>
      <CompanyStepsProvider>
        <ReportStepsProvider>
          <Layout enableBackground={enableWidgetBackground}>
            {currentView}
            {!currentView && isForSignaturePage && <SignatureWelcomePage />}
            {!currentView && !isForSignaturePage && <GenericWelcomePage />}
          </Layout>
        </ReportStepsProvider>
      </CompanyStepsProvider>
    </NebuiaSdkProvider>
  );
};

const NebuiaStepsListValidations: FC<
  Pick<WidgetProps, 'kyc' | 'getKeys'> & {
    lang?: Lang;
    enableBackground?: boolean;
  }
> = ({ getKeys, lang, kyc }) => {
  const [keys, setKeys] = useState<NebuiaKeys>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { enableWidgetBackground } = useWidgetConfig();

  useEffect(() => {
    const load = async () => {
      const [keys, langResult] = await Promise.allSettled([
        getKeys(),
        initI18n(lang),
      ]);
      if (keys.status === 'fulfilled') {
        setKeys(keys.value);
      } else {
        const reason = keys.reason as unknown;
        const defaultError =
          lang === 'en' ? 'Error loading keys' : 'Error al cargar las llaves';

        setError(reason instanceof Error ? reason.message : defaultError);

        return;
      }

      if (langResult.status !== 'fulfilled') {
        const reason = langResult.reason as unknown;
        const defaultError =
          lang === 'en'
            ? 'Error loading language'
            : 'Error al cargar el idioma';
        setError(reason instanceof Error ? reason.message : defaultError);
      }
    };

    setIsLoading(true);
    load().finally(() => {
      setIsLoading(false);
    });
  }, [getKeys, lang]);

  if (isLoading) {
    return (
      <Layout enableBackground={enableWidgetBackground}>
        <div className="flex h-full flex-col justify-center">
          <Loader />;
        </div>
      </Layout>
    );
  }

  if (error ?? !keys) {
    return (
      <Layout enableBackground={enableWidgetBackground}>
        <div>{error}</div>;
      </Layout>
    );
  }

  return <Content kyc={kyc} keys={keys} />;
};

export const NebuiaStepsList: FC<
  WidgetProps & {
    enableBackground?: boolean;
    lang?: Lang;
    isForSignaturePage?: boolean;
  }
> = ({
  enableBackground,
  getKeys,
  onFinish,
  email,
  isForSignaturePage,
  kyc,
  lang,
  phone,
  withDetailsPage,
}) => {
  return (
    <WidgetConfigProvider
      enableBackground={enableBackground ?? false}
      email={email}
      onFinished={onFinish}
      phone={phone}
      isForSignaturePage={isForSignaturePage}
      withDetailsPage={withDetailsPage}
    >
      <CurrentViewProvider>
        <ThemeProvider>
          <ControlActionsProvider>
            <NebuiaStepsListValidations
              getKeys={getKeys}
              kyc={kyc}
              lang={lang}
            />
          </ControlActionsProvider>
        </ThemeProvider>
      </CurrentViewProvider>
    </WidgetConfigProvider>
  );
};
