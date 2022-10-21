import { useCallback, useEffect, useState } from 'react';

import { Optional } from '../../lib/common/Optional';
import { ParamCallback } from '../../lib/common/VoidCallback';

type Returns = {
  setRequested: ParamCallback<boolean>;
  requested: boolean;
  countDown: Optional<number>;
};
export const useRequestCountDown = (): Returns => {
  const [requested, setRequested] = useState(false);
  const [countDown, setCountDown] = useState<Optional<number>>();

  const updateCountDown = useCallback(() => {
    setTimeout(
      () =>
        setCountDown((prev) => {
          return prev && prev >= 1 ? prev - 1 : 1;
        }),
      1000,
    );
  }, []);
  useEffect(() => {
    if (requested) {
      setCountDown(1 * 60);
    }
    if (!requested) {
      setCountDown(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requested]);

  useEffect(() => {
    if (!countDown) {
      setRequested(false);

      return;
    }
    updateCountDown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  return {
    setRequested,
    requested,
    countDown,
  };
};
