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
  ParamCallback,
  ValueCallback,
  VoidCallback,
} from '../../lib/common/VoidCallback';
import { CompleteSteps } from '../models/CompletedSteps';
import { NebuiaKeys } from '../models/Keys';
import { NebuiaApiRepository } from '../repository/ApiRepository';

type IContext = {
  steps: Optional<CompleteSteps>;
  keys: NebuiaKeys;
  kyc: string;
  changeView: ParamCallback<JSX.Element>;
  view: Optional<JSX.Element>;
  loadSteps: ParamCallback<NebuiaKeys, Promise<void>>;
  loading: boolean;
  onFinish: VoidCallback;
  finishStep: VoidCallback;
  emailValue: Optional<string>;
  phoneValue: Optional<string>;
};
export type NebuiaStepsContextProviderProps = {
  kyc?: string;
  email?: string;
  phone?: string;
  onFinish: VoidCallback;
  getKeys: ValueCallback<Promise<NebuiaKeys | string>>;
};

const context = createContext<IContext>({} as IContext);
export const NebuiaStepsContextProvider: FC<
  PropsWithChildren<NebuiaStepsContextProviderProps>
> = ({ kyc, children, onFinish, email, phone, getKeys }) => {
  const [view, setView] = useState<Optional<JSX.Element>>();
  const [report, setReport] = useState(kyc ?? '');
  const [keys, setKeys] = useState<NebuiaKeys>({
    apiKey: '',
    apiSecret: '',
    keyId: '',
  });
  const [steps, setSteps] = useState<Optional<CompleteSteps>>();
  const [loading, setLoading] = useState(true);
  const loadSteps = async (keys: NebuiaKeys, paramReport = '') => {
    setLoading(true);
    const response = await NebuiaApiRepository.getStepsFromReport({
      keys,
      report: paramReport || report,
    });
    if (response.status) {
      if (response.payload.steps.every((s) => s.status)) {
        return onFinish();
      }
      setSteps(response.payload);
      setLoading(false);

      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await Swal.fire({
      icon: 'error',
      title: 'Error al cargar los pasos',
      text: response.messages,
      confirmButtonText: 'Reintentar',
    });

    await loadSteps(keys);
  };
  const finishStep = async () => {
    setView(undefined);
    await loadSteps(keys);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await Swal.fire({
      icon: 'error',
      title: 'Error al cargar las credenciales',
      text: keys,
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonText: 'Reintentar',
    });
    await firstLoad();
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
        changeView: setView,
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
