import { FC, PropsWithChildren } from 'react';

import clsxm from '../../../utils/clsxm';
import Button, { ButtonVariant } from './Button';

type Props = Omit<
  React.ComponentProps<typeof Button>,
  'small' | 'extraSmall' | 'variant'
> & {
  variant?: ButtonVariant;
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
      className={clsxm('!p-1 !rounded-full', className)}
    >
      {children}
    </Button>
  );
};
