import { FC, PropsWithChildren } from 'react';

import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import clsxm from '../../utils/clsxm';

export const P: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const {
    theme: { dark },
  } = useTheme();

  return (
    <p
      className={clsxm(
        `text-sm font-normal`,
        dark ? 'text-white' : 'text-black',
        className,
      )}
    >
      {children}
    </p>
  );
};
