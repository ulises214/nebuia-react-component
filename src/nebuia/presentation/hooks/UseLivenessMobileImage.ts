import { NebuiaKeys } from '@nebuia-ts/models';
import { useEffect, useState } from 'react';

import { useNebuiaSdk } from './UseRepository';

export const useLivenessMobileImage = (): string | undefined => {
  const sdk = useNebuiaSdk();
  const [link, setLink] = useState('');
  useEffect(() => {
    const report = sdk.getReport();
    sdk.keys
      .then((keys) => {
        const { apiKey, apiSecret } = keys.payload as NebuiaKeys;
        const url = `https://widget.nebuia.com/nebuia-face?api_key=${apiKey}&api_secret=${apiSecret}&report=${report}`;
        setLink(url);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, [sdk, sdk.keys]);

  return link;
};
