import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import Swal from 'sweetalert2';

import { Optional } from '../../lib/common/Optional';
import {
  DoubleParamCallback,
  ParamCallback,
  ValueCallback,
} from '../../lib/common/VoidCallback';
import { CompleteSteps } from '../models/CompletedSteps';
import { NebuiaKeys } from '../models/Keys';
import { NebuiaApiRepository } from '../repository/ApiRepository';
import { SummaryPage } from '../steps/Summary/Summary.page';
import { useNebuiaThemeContext } from './NebuiaThemeContext';

type IContext = {
  steps: Optional<CompleteSteps>;
  keys: NebuiaKeys;
  kyc: string;
  changeView: DoubleParamCallback<JSX.Element, string | undefined>;
  title: string;
  view: Optional<JSX.Element>;
  loadSteps: ParamCallback<NebuiaKeys, Promise<void>>;
  loading: boolean;
  onFinish: ParamCallback<string, Promise<void>>;
  finishStep: VoidFunction;
  emailValue: Optional<string>;
  phoneValue: Optional<string>;
};
export type NebuiaStepsContextProviderProps = {
  kyc?: string;
  email?: string;
  phone?: string;
  onFinish: ParamCallback<string, Promise<void>>;
  getKeys: ValueCallback<Promise<NebuiaKeys | string>>;
  withDetailsPage?: boolean;
};

const context = createContext<IContext>({} as IContext);

const DEFAULT_TITLE = 'Completa tu proceso de identidad';

export const NebuiaStepsContextProvider: FC<
  PropsWithChildren<NebuiaStepsContextProviderProps>
> = ({ kyc, children, onFinish, email, phone, getKeys, withDetailsPage }) => {
  const { setColorScheme, setDefaultColorScheme } = useNebuiaThemeContext();
  const [view, setView] = useState<Optional<JSX.Element>>();
  const [report, setReport] = useState(kyc ?? '');
  const [keys, setKeys] = useState<NebuiaKeys>({
    apiKey: '',
    apiSecret: '',
    keyId: '',
  });
  const [steps, setSteps] = useState<Optional<CompleteSteps>>();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const loadSteps = async (keys: NebuiaKeys, paramReport = '') => {
    setLoading(true);
    const [response, themeResponse] = await Promise.all([
      NebuiaApiRepository.getStepsFromReport({
        keys,
        report: paramReport || report,
      }),
      NebuiaApiRepository.getCompanyTheme(keys),
    ]);
    if (themeResponse.status) {
      const theme = themeResponse.payload;
      setColorScheme({
        dark: theme.dark_mode,
        primary: theme.primary_color,
        secondary: theme.secondary_color,
      });
    } else {
      setDefaultColorScheme();
    }
    if (!response.status) {
      await Swal.fire({
        icon: 'error',
        title: 'Error al cargar los pasos',
        text: response.payload,
        confirmButtonText: 'Reintentar',
      });

      await loadSteps(keys);

      return;
    }
    const reportCompleted = response.payload.steps.every((s) => s.status);
    if (reportCompleted) {
      if (withDetailsPage) {
        setLoading(false);
        setView(<SummaryPage />);
        setTitle('Resumen de tu proceso de identidad');

        return;
      }

      await onFinish(report);

      return;
    }
    setSteps(response.payload);
    setLoading(false);
  };
  const finishStep = () => {
    setView(undefined);
    setTitle(DEFAULT_TITLE);
    loadSteps(keys).catch(console.error);
  };
  const loadReport = async (keys: NebuiaKeys): Promise<string> => {
    if (report) {
      return report;
    }
    const response = await NebuiaApiRepository.generateReport({
      keys,
      report: '',
    });
    if (response.status) {
      setReport(response.payload);

      return response.payload;
    }

    return '';
  };
  const firstLoad = async () => {
    const keys = await getKeys();
    if (typeof keys !== 'string') {
      const report = await loadReport(keys);
      setKeys(keys);

      return loadSteps(keys, report);
    }
    const response = await Swal.fire({
      icon: 'error',
      title: 'Error al cargar las credenciales',
      text: keys,
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonText: 'Reintentar',
    });

    if (response.isConfirmed) {
      await firstLoad();
    }
  };

  const changeView = (view: JSX.Element, title?: string) => {
    setView(view);
    title && setTitle(title);
  };

  useEffect(() => {
    void firstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <context.Provider
      value={{
        emailValue: email,
        phoneValue: phone,
        title,
        changeView,
        finishStep,
        keys,
        kyc: report,
        loading,
        loadSteps,
        onFinish,
        steps,
        view,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useNebuiaStepsContext = (): IContext => {
  return useContext(context);
};
