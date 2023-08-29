import { FC, PropsWithChildren } from 'react';

import { PromiseCallback } from '../../../domain/types/ParamCallback';
import { widgetConfigContext } from './Context';

type Props = {
  email?: string;
  phone?: string;
  isForSignaturePage?: boolean;
  onFinished: PromiseCallback<string>;
  withDetailsPage?: boolean;
  enableBackground: boolean;
  report?: string;
};
export const WidgetConfigProvider: FC<PropsWithChildren<Props>> = ({
  children,
  email,
  isForSignaturePage,
  phone,
  onFinished,
  withDetailsPage,
  enableBackground,
  report,
}) => {
  return (
    <widgetConfigContext.Provider
      value={{
        report,
        enableWidgetBackground: enableBackground,
        initialEmail: email,
        initialPhone: phone,
        isForSignaturePage: isForSignaturePage ?? false,
        onFinished,
        withDetailsPage: withDetailsPage ?? false,
      }}
    >
      {children}
    </widgetConfigContext.Provider>
  );
};
