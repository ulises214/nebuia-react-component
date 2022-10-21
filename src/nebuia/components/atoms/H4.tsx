import { FC, PropsWithChildren } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';

export const H4: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <h4 className={clsxm('text-center font-bold', className)}>{children}</h4>
  );
};
