import { FC, PropsWithChildren, useMemo } from 'react';

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
  signDocuments: boolean;
  isFaceStandAlone?: boolean;
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
  signDocuments,
  isFaceStandAlone,
}) => {
  const value = useMemo(
    () => ({
      language: lang,
      signDocuments,
      report,
      enableWidgetBackground: enableBackground,
      initialEmail: email,
      initialPhone: phone,
      isForSignaturePage: isForSignaturePage ?? false,
      onFinished,
      withDetailsPage: withDetailsPage ?? false,
      isFaceStandAlone: isFaceStandAlone ?? false,
    }),
    [
      email,
      enableBackground,
      isForSignaturePage,
      lang,
      onFinished,
      phone,
      report,
      signDocuments,
      withDetailsPage,
      isFaceStandAlone,
    ],
  );

  return (
    <widgetConfigContext.Provider value={value}>
      {children}
    </widgetConfigContext.Provider>
  );
};
