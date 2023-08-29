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
};
export const WidgetConfigProvider: FC<PropsWithChildren<Props>> = ({
  children,
  email,
  isForSignaturePage,
  phone,
  onFinished,
  withDetailsPage,
  enableBackground,
}) => {
  return (
    <widgetConfigContext.Provider
      value={{
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
