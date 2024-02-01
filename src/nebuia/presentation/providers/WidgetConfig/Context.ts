import { createContext, useContext } from 'react';

import { PromiseCallback } from '../../../domain/types/ParamCallback';
import { WidgetProps } from '../../../domain/types/WidgetProps';

export interface WidgetConfigContext {
  initialEmail?: string;
  initialPhone?: string;
  onFinished: PromiseCallback<string>;
  withDetailsPage: boolean;
  enableWidgetBackground: boolean;
  report?: string;
  language: 'es' | 'en';
  reportType: WidgetProps['reportType'];
  isFaceStandAlone: boolean;
  theme: 'light' | 'dark' | 'system';
}
export const widgetConfigContext = createContext({} as WidgetConfigContext);

export const useWidgetConfig = (): WidgetConfigContext =>
  useContext(widgetConfigContext);
