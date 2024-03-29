import { FC, PropsWithChildren } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
import { Theme } from '../../models/Theme';

type PProps = {
  className?: string;
  small?: boolean;
  secondary?: boolean;
  bold?: boolean;
  center?: boolean;
  justify?: boolean;
};
export const P: FC<PropsWithChildren<PProps>> = ({
  children,
  className,
  secondary,
  small,
  bold,
  center,
  justify,
}) => {
  const { theme } = useNebuiaThemeContext();

  return (
    <p
      className={clsxm(
        className,
        bold && 'font-bold',
        center && 'text-center',
        justify && 'text-justify',
      )}
      style={{
        color: secondary ? theme.textSecondary : theme.text,
        fontSize: small ? Theme.i.smallSize : Theme.i.normalSize,
      }}
    >
      {children}
    </p>
  );
};
