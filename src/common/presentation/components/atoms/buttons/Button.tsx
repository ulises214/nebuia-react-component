import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import styles from './Button.module.css';

import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';
import classNames from '../../../utils/clsxm';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'white'
  | 'black'
  | 'error'
  | 'success'
  | 'warning'
  | 'outline-error'
  | 'outline-info'
  | 'outline-success'
  | 'info'
  | 'text';

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant: ButtonVariant;
  small?: boolean;
  extraSmall?: boolean;
  center?: boolean;
  withNotification?: boolean;
  as?: React.ElementType;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      extraSmall,
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant,
      isDarkBg: isDarkBgProp,
      center = false,
      small,
      withNotification = false,
      as,
      ...rest
    },
    ref,
  ) => {
    const {
      theme: { dark },
    } = useTheme();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const disabled = isLoading || buttonDisabled;

    const isDarkBg = isDarkBgProp ?? dark;

    const Component = as ?? 'button';

    return (
      <Component
        ref={ref}
        type="button"
        disabled={disabled}
        className={classNames(
          styles['button'],
          center && styles['center'],
          small && styles['small'],
          extraSmall && styles['extraSmall'],
          styles[variant],
          disabled && styles['disabled'],
          isLoading && styles['loading'],
          isDarkBg ? styles['dark'] : styles['light'],
          !isDarkBg && styles['light'],
          //#endregion  //*======== Variants ===========
          className,
        )}
        {...rest}
      >
        {withNotification && (
          <div className="absolute -top-2 right-[-2px]">
            <span className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-white"></span>
          </div>
        )}
        {isLoading && (
          <div
            className={classNames(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {children}
      </Component>
    );
  },
);
Button.displayName = 'Button';
export default Button;
