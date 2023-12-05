import { NebuiaKeys } from '@nebuia-ts/models';
import { FC, useEffect, useState } from 'react';

import { Loader } from '../common/presentation/components/atoms/Loader';
import { Layout } from '../common/presentation/components/layouts/Layout';
import { ControlActionsProvider } from '../common/presentation/providers/ControlActionsProvider';
import { CurrentViewProvider } from '../common/presentation/providers/CurrentViewProvider';
import { useCurrentView } from '../common/presentation/providers/CurrentViewProvider/Context';
import { NebuiaFace } from '../new-face/new-face';
import { ThemeProvider } from '../theme/presentation/providers/ThemeProvider';
import { initI18n, Lang } from '../translations/initi18';
import { WidgetProps } from './domain/types/WidgetProps';
import { FinishDetailsPage } from './presentation/pages/DetailsPage';
import { GenericWelcomePage } from './presentation/pages/GenericWelcomePage';
import { SignaturePage } from './presentation/pages/Signature/SignaturePage';
import { SignatureWelcomePage } from './presentation/pages/SignatureWelcomePage';
import { StepsView } from './presentation/pages/StepView';
import { CompanyStepsProvider } from './presentation/providers/CompanySteps';
import { ReportStepsProvider } from './presentation/providers/ReportSteps';
import { useReportSteps } from './presentation/providers/ReportSteps/Context';
import { NebuiaSdkProvider } from './presentation/providers/RepositoryProvider';
import { WidgetConfigProvider } from './presentation/providers/WidgetConfig';
import { useWidgetConfig } from './presentation/providers/WidgetConfig/Context';

const _Content: FC = () => {
  const { currentView } = useCurrentView();
  const { isForSignaturePage, report } = useWidgetConfig();
  const [isLoading, setIsLoading] = useState(!!report);
  const { loadSteps } = useReportSteps();
  const { isFaceStandAlone } = useWidgetConfig();

  useEffect(() => {
    if (isLoading) {
      void loadSteps().finally(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading, loadSteps]);

  if (isLoading) {
    return <Loader />;
  }
  if (isFaceStandAlone) {
    return <NebuiaFace />;
  }
  if (currentView === 'initial') {
    if (!report) {
      return (
        <>
          {isForSignaturePage && <SignatureWelcomePage />}
          {!isForSignaturePage && <GenericWelcomePage />}
        </>
      );
    }

    return <StepsView />;
  }

  if (currentView === 'steps') {
    return <StepsView />;
  }
  if (currentView === 'signature') {
    return <SignaturePage />;
  }

  return <FinishDetailsPage />;
};

const Content: FC<{
  keys: NebuiaKeys;
}> = ({ keys }) => {
  const { enableWidgetBackground } = useWidgetConfig();

  return (
    <NebuiaSdkProvider keys={keys}>
      <CompanyStepsProvider>
        <ReportStepsProvider>
          <Layout enableBackground={enableWidgetBackground}>
            <_Content />
          </Layout>
        </ReportStepsProvider>
      </CompanyStepsProvider>
    </NebuiaSdkProvider>
  );
};

const getKeysError = (error: PromiseRejectedResult, lang: Lang) => {
  const reason = error.reason as unknown;
  const defaultError =
    lang === 'en' ? 'Error loading keys' : 'Error al cargar las llaves';

  return reason instanceof Error ? reason.message : defaultError;
};

const getLangError = (error: PromiseRejectedResult, lang: Lang) => {
  const reason = error.reason as unknown;
  const defaultError =
    lang === 'en' ? 'Error loading language' : 'Error al cargar el idioma';

  return reason instanceof Error ? reason.message : defaultError;
};

const NebuiaStepsListValidations: FC<
  Pick<WidgetProps, 'getKeys'> & {
    lang?: Lang;
    enableBackground?: boolean;
  }
> = ({ getKeys, lang }) => {
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
        setError(getKeysError(keys, lang ?? 'es'));

        return;
      }

      if (langResult.status !== 'fulfilled') {
        setError(getLangError(langResult, lang ?? 'es'));
      }
    };

    setIsLoading(true);
    void load().finally(() => {
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

  return <Content keys={keys} />;
};

export const NebuiaStepsList: FC<
  WidgetProps & {
    enableBackground?: boolean;
    lang?: Lang;
    isForSignaturePage?: boolean;
    isFaceStandAlone?: boolean;
  }
> = ({
  isFaceStandAlone,
  enableBackground,
  getKeys,
  onFinish,
  email,
  isForSignaturePage,
  kyc,
  lang,
  phone,
  withDetailsPage,
  signDocuments,
}) => {
  return (
    <WidgetConfigProvider
      isFaceStandAlone={isFaceStandAlone}
      lang={lang ?? 'es'}
      signDocuments={signDocuments ?? false}
      enableBackground={enableBackground ?? false}
      email={email}
      onFinished={onFinish}
      phone={phone}
      isForSignaturePage={isForSignaturePage}
      withDetailsPage={withDetailsPage}
      report={kyc}
    >
      <CurrentViewProvider>
        <ThemeProvider>
          <ControlActionsProvider>
            <NebuiaStepsListValidations getKeys={getKeys} lang={lang} />
          </ControlActionsProvider>
        </ThemeProvider>
      </CurrentViewProvider>
    </WidgetConfigProvider>
  );
};
