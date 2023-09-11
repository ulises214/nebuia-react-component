import { NebuiaCompanyWidgetSettings } from '@nebuia-ts/models';
import { useEffect } from 'react';

type OnThemeChange = (arg0: NebuiaCompanyWidgetSettings) => void;
export const useThemeBroadcast = (setColorScheme: OnThemeChange): void => {
  useEffect(() => {
    const bc = new BroadcastChannel('nebuia');
    bc.onmessage = (e: MessageEvent) => {
      if ((e.data as Record<string, unknown>)['type'] === 'updateTheme') {
        setColorScheme(
          (e.data as { payload: unknown })
            .payload as NebuiaCompanyWidgetSettings,
        );
      }
    };

    return () => {
      bc.onmessage = null;
      bc.close();
    };
  }, [setColorScheme]);
};