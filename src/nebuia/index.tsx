import { Layout } from '@components/layouts/Layout';
import { NebuiaKeys } from 'nebuia-ts/models';
import { FC, lazy, Suspense, useEffect, useState } from 'react';

import { Loader } from '../common/presentation/components/atoms/Loader';
import { ControlActionsProvider } from '../common/presentation/providers/ControlActionsProvider';
import { CurrentViewProvider } from '../common/presentation/providers/CurrentViewProvider';
import { useCurrentView } from '../common/presentation/providers/CurrentViewProvider/Context';
import { NebuiaFace } from '../new-face/new-face';
import { ThemeProvider } from '../theme/presentation/providers/ThemeProvider';
import { Lang } from '../translations/initi18';
import { WidgetProps } from './domain/types/WidgetProps';
import { FinishDetailsPage } from './presentation/pages/DetailsPage';
import { GenericWelcomePage } from './presentation/pages/GenericWelcomePage';
import { KeysChecker } from './presentation/pages/KeysChecker';
import { SignatureWelcomePage } from './presentation/pages/SignatureWelcomePage';
import { StepsView } from './presentation/pages/StepView';
import { CompanyStepsProvider } from './presentation/providers/CompanySteps';
import { ReportStepsProvider } from './presentation/providers/ReportSteps';
import { useReportSteps } from './presentation/providers/ReportSteps/Context';
import { NebuiaSdkProvider } from './presentation/providers/RepositoryProvider';
import { WidgetConfigProvider } from './presentation/providers/WidgetConfig';
import { useWidgetConfig } from './presentation/providers/WidgetConfig/Context';

const SignaturePage = lazy(
  () => import('./presentation/pages/Signature/SignaturePage'),
);

const CreditEnrollmentPage = lazy(
  () => import('../services/credits/presentation/pages'),
);

const _Content: FC = () => {
  const { currentView } = useCurrentView();
  const { report } = useWidgetConfig();
  const [isLoading, setIsLoading] = useState(!!report);
  const { loadSteps } = useReportSteps();
  const { isFaceStandAlone, reportType } = useWidgetConfig();

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
          {reportType === 'SIGNATURE' && <SignatureWelcomePage />}
          {reportType !== 'SIGNATURE' && <GenericWelcomePage />}
        </>
      );
    }

    return <StepsView />;
  }

  if (currentView === 'steps') {
    return <StepsView />;
  }
  if (currentView === 'signature') {
    return <Suspense fallback={<Loader />}>{<SignaturePage />}</Suspense>;
  }
  if (currentView === 'credits_enrollment') {
    return (
      <Suspense fallback={<Loader />}>{<CreditEnrollmentPage />}</Suspense>
    );
  }

  return <FinishDetailsPage />;
};

const Content: FC<{
  keys: NebuiaKeys;
}> = ({ keys }) => {
  return (
    <NebuiaSdkProvider keys={keys}>
      <CompanyStepsProvider>
        <ReportStepsProvider>
          <_Content />
        </ReportStepsProvider>
      </CompanyStepsProvider>
    </NebuiaSdkProvider>
  );
};

const getKeysError = (reason: unknown, lang: Lang) => {
  const defaultError =
    lang === 'en' ? 'Error loading keys' : 'Error al cargar las llaves';

  return reason instanceof Error ? reason.message : defaultError;
};

const NebuiaStepsListValidations: FC<
  Pick<WidgetProps, 'getKeys'> & {
    lang?: Lang;
  }
> = ({ getKeys, lang }) => {
  const [keys, setKeys] = useState<NebuiaKeys>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const load = async () => {
      try {
        const keys = await getKeys();
        setKeys(keys);
      } catch (error) {
        setError(getKeysError(error, lang ?? 'es'));
      }
    };

    setIsLoading(true);
    void load().finally(() => {
      setIsLoading(false);
    });
  }, [getKeys, lang]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col justify-center">
        <Loader />
      </div>
    );
  }

  if (error ?? !keys) {
    return <div>{error}</div>;
  }

  return <Content keys={keys} />;
};

const NebuiaStepsList: FC<
  WidgetProps & {
    enableBackground?: boolean;
    lang?: Lang;
    isFaceStandAlone?: boolean;
    theme?: 'dark' | 'light' | 'system';
  }
> = ({
  isFaceStandAlone,
  enableBackground,
  getKeys,
  onFinish,
  email,
  kyc,
  lang,
  phone,
  withDetailsPage,
  reportType,
  theme = 'system',
}) => {
  return (
    <WidgetConfigProvider
      theme={theme}
      isFaceStandAlone={isFaceStandAlone}
      lang={lang ?? 'es'}
      reportType={reportType}
      enableBackground={enableBackground ?? false}
      email={email}
      onFinished={onFinish}
      phone={phone}
      withDetailsPage={withDetailsPage}
      report={kyc}
    >
      <ThemeProvider>
        <KeysChecker getKeys={getKeys}>
          <CurrentViewProvider>
            <ControlActionsProvider>
              <Layout>
                <NebuiaStepsListValidations getKeys={getKeys} lang={lang} />
              </Layout>
            </ControlActionsProvider>
          </CurrentViewProvider>
        </KeysChecker>
      </ThemeProvider>
    </WidgetConfigProvider>
  );
};

export default NebuiaStepsList;
