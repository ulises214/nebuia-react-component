import { createContext, useContext } from 'react';

import { PromiseCallback } from '../../../domain/types/ParamCallback';

export interface WidgetConfigContext {
  initialEmail?: string;
  initialPhone?: string;
  isForSignaturePage: boolean;
  onFinished: PromiseCallback<string>;
  withDetailsPage: boolean;
  enableWidgetBackground: boolean;
  report?: string;
  language: 'es' | 'en';
}
export const widgetConfigContext = createContext({} as WidgetConfigContext);

export const useWidgetConfig = (): WidgetConfigContext =>
  useContext(widgetConfigContext);
