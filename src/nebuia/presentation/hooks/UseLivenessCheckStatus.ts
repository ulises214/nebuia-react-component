import { useEffect, useRef, useState } from 'react';

import { useNebuiaSdk, useNebuiaUtils } from './UseRepository';

export const useLivenessCheckStatus = (): boolean => {
  const [checked, setChecked] = useState(false);
  const sdk = useNebuiaSdk();
  const utils = useNebuiaUtils();
  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    // each 15 seconds check for
    const report = sdk.getReport();
    if (!report) {
      return;
    }
    function realizarConsulta() {
      utils
        .existReport({ report })
        .then((res) => {
          if (res.status && res.payload.face?.liveness) {
            setChecked(true);
          } else {
            timeoutRef.current = setTimeout(realizarConsulta, 5000);
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          timeoutRef.current = setTimeout(realizarConsulta, 5000);
        });
    }

    timeoutRef.current = setTimeout(realizarConsulta, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sdk, utils]);

  return checked;
};
