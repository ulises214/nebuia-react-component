import { FC, PropsWithChildren } from 'react';

import { Lang } from '../../../../translations/initi18';
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
  lang: Lang;
};
export const WidgetConfigProvider: FC<PropsWithChildren<Props>> = ({
  children,
  email,
  isForSignaturePage,
  phone,
  onFinished,
  withDetailsPage,
  enableBackground,
  lang,
  report,
}) => {
  return (
    <widgetConfigContext.Provider
      value={{
        language: lang,
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
