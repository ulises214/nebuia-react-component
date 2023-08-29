import { useEffect } from 'react';

import { PromiseOrCallback } from '../../../nebuia/domain/types/ParamCallback';
import { useControlAction } from '../providers/ControlActionsContext';

type Props = {
  label: string;
  action: PromiseOrCallback<void>;
  side: 'next' | 'previous';
  active?: boolean;
  show?: boolean;
};
export const useControlButton = ({
  action,
  label,
  side,
  active = true,
  show = true,
}: Props): void => {
  const { setNext, setPrevious } = useControlAction();

  useEffect(() => {
    if (side !== 'next') {
      return;
    }
    setNext({ label, action, active, show });

    return () => {
      setNext(undefined);
    };
  }, [action, label, side, setNext, active, show]);

  useEffect(() => {
    if (side !== 'previous' || !active) {
      return;
    }
    setPrevious({ label, action, active, show });

    return () => {
      setPrevious(undefined);
    };
  }, [action, label, side, setPrevious, active, show]);
};
