import { FC, PropsWithChildren } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';

export const H3: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <h3 className={clsxm('text-center font-bold', className)}>{children}</h3>
  );
};
