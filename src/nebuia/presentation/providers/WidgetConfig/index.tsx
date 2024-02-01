import { Loader } from '@components/atoms/Loader';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { initI18n, Lang } from '../../../../translations/initi18';
import { PromiseCallback } from '../../../domain/types/ParamCallback';
import { WidgetProps } from '../../../domain/types/WidgetProps';
import { widgetConfigContext } from './Context';

type Props = {
  email?: string;
  phone?: string;
  onFinished: PromiseCallback<string>;
  withDetailsPage?: boolean;
  enableBackground: boolean;
  report?: string;
  lang: Lang;
  isFaceStandAlone?: boolean;
  theme: 'dark' | 'light' | 'system';
  reportType: WidgetProps['reportType'];
};

const getLangError = (reason: unknown, lang: Lang) => {
  const defaultError =
    lang === 'en' ? 'Error loading language' : 'Error al cargar el idioma';

  return reason instanceof Error ? reason.message : defaultError;
};

export const WidgetConfigProvider: FC<PropsWithChildren<Props>> = ({
  children,
  email,
  phone,
  onFinished,
  withDetailsPage,
  enableBackground,
  lang,
  report,
  reportType,
  isFaceStandAlone,
  theme,
}) => {
  const [langState, setLangState] = useState<
    { loading: true } | { error: string } | { success: true }
  >({ loading: true });
  const value = useMemo(
    () => ({
      language: lang,
      reportType,
      report,
      enableWidgetBackground: enableBackground,
      initialEmail: email,
      initialPhone: phone,
      onFinished,
      withDetailsPage: withDetailsPage ?? false,
      isFaceStandAlone: isFaceStandAlone ?? false,
      theme,
    }),
    [
      email,
      enableBackground,
      lang,
      onFinished,
      phone,
      report,
      reportType,
      withDetailsPage,
      isFaceStandAlone,
      theme,
    ],
  );

  useEffect(() => {
    async function load() {
      try {
        await initI18n(lang);
        setLangState({ success: true });
      } catch (e) {
        const error = getLangError(e, lang);
        setLangState({ error });
      }
    }
    void load();
  }, [lang]);

  if ('loading' in langState) {
    return <Loader />;
  }

  return (
    <widgetConfigContext.Provider value={value}>
      {children}
    </widgetConfigContext.Provider>
  );
};
