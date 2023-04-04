import { FC, PropsWithChildren } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
import { Theme } from '../../models/Theme';

type H1Props = {
  className?: string;
  center?: boolean;
};
export const H1: FC<PropsWithChildren<H1Props>> = ({
  children,
  center,
  className,
}) => {
  const { theme } = useNebuiaThemeContext();

  return (
    <h1
      className={clsxm('font-bold', center && 'text-center', className)}
      style={{ color: theme.text, fontSize: Theme.i.titleSize }}
    >
      {children}
    </h1>
  );
};

export const H2: FC<PropsWithChildren<H1Props>> = ({
  children,
  center,
  className,
}) => {
  const { theme } = useNebuiaThemeContext();

  return (
    <h2
      className={clsxm('font-bold', center && 'text-center', className)}
      style={{ color: theme.text }}
    >
      {children}
    </h2>
  );
};
