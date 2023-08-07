import { FC, PropsWithChildren } from 'react';

import classNames from '../../../lib/common/utils/clsxm';
import Button, { ButtonVariant } from './Button';

type Props = Omit<React.ComponentProps<typeof Button>, 'small' | 'extraSmall' | 'variant'> & {
  variant?: ButtonVariant
};
export const IconButton: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  variant = 'ghost',
  className,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      variant={variant}
      onClick={onClick}
      extraSmall
      className={classNames(className, '!p-1 !rounded-full')}
    >
      {children}
    </Button>
  );
};
