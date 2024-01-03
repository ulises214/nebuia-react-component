import { ComponentPropsWithRef, ElementType, forwardRef } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';
import clsxm from '../../../utils/clsxm';

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
  | 'text'
  | 'info';

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant: ButtonVariant;
  small?: boolean;
  extraSmall?: boolean;
  center?: boolean;
  withNotification?: boolean;
  as?: ElementType;
} & ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
    const disabled = !!isLoading || buttonDisabled;

    const isDarkBg = isDarkBgProp ?? dark;

    const Component = as ?? 'button';

    return (
      <Component
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsxm(
          'nebuia-button',
          center && 'center-button',
          small && 'button-small',
          extraSmall && 'button-extraSmall',
          variant === 'primary' && 'nebuia-button-primary',
          variant === 'secondary' && 'nebuia-button-secondary',
          variant === 'outline' && 'nebuia-button-outline',
          variant === 'ghost' && 'nebuia-button-ghost',
          variant === 'white' && 'nebuia-button-white',
          variant === 'black' && 'nebuia-button-black',
          variant === 'error' && 'nebuia-button-error',
          variant === 'success' && 'nebuia-button-success',
          variant === 'warning' && 'nebuia-button-warning',
          variant === 'outline-error' && 'nebuia-button-outlin-eerror',
          variant === 'outline-info' && 'nebuia-button-outline-info',
          variant === 'outline-success' && 'nebuia-button-outline-success',
          variant === 'text' && 'nebuia-button-text',
          variant === 'info' && 'nebuia-button-info',
          isLoading && 'loading',
          isDarkBg ? 'dark' : 'light',
          !isDarkBg && 'light',
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
            className={clsxm(
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
