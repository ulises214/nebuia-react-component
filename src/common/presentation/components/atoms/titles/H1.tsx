import { FC, PropsWithChildren } from 'react';

import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';
import clsxm from '../../../utils/clsxm';

export const H1: FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ children, className }) => {
  const {
    theme: { dark },
  } = useTheme();

  return (
    <h1
      className={clsxm(
        `text-xl font-bold text-center`,
        dark ? 'text-white' : 'text-black',
        className,
      )}
    >
      {children}
    </h1>
  );
};
