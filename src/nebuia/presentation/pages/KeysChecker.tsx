import { Loader } from '@components/atoms/Loader';
import { Alert } from '@components/molecules/Alert';
import { NebuiaKeys } from '@nebuia-ts/models';
import { NebuiaWidget } from '@nebuia-ts/sdk';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PromiseOrValueCallback } from '../../domain/types/ParamCallback';

type ComponentState =
  | {
      success: boolean;
    }
  | {
      error: string;
    }
  | {
      loading: boolean;
    };
export const KeysChecker: FC<
  PropsWithChildren<{
    getKeys: PromiseOrValueCallback<NebuiaKeys>;
  }>
> = ({ children, getKeys }) => {
  const [widgetState, setWidgetState] = useState<ComponentState>({
    loading: true,
  });
  const { t } = useTranslation();
  useEffect(() => {
    async function init() {
      try {
        const keys = await Promise.resolve(getKeys());
        const widget = new NebuiaWidget(keys);
        const response = await widget.validateKeys();
        if (response.status) {
          setWidgetState({ success: true });
        } else {
          setWidgetState({ error: t('validateKeys.invalid') });
        }
      } catch (_) {
        setWidgetState({ error: t('validateKeys.error') });
      }
    }
    void init();
  }, [getKeys, t]);
  if ('loading' in widgetState) {
    return <Loader />;
  }
  if ('error' in widgetState) {
    return <Alert variant="error" message={widgetState.error}></Alert>;
  }

  return children;
};
