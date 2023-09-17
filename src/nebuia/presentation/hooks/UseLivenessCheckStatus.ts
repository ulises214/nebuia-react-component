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
    function checkLiveness() {
      utils
        .existReport({ report })
        .then((res) => {
          if (res.status && res.payload.face?.liveness) {
            setChecked(true);
          } else {
            timeoutRef.current = setTimeout(checkLiveness, 5000);
          }
        })
        .catch(() => {
          timeoutRef.current = setTimeout(checkLiveness, 5000);
        });
    }

    timeoutRef.current = setTimeout(checkLiveness, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sdk, utils]);

  return checked;
};
