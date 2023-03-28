import { forwardRef } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '../../../lib/common/utils/clsxm';
import { useNebuiaThemeContext } from '../../../nebuia/context/NebuiaThemeContext';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
  'error',
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant: keyof typeof ButtonVariant;
  small?: boolean;
  center?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading = false,
      variant,
      isDarkBg = false,
      center = false,
      small,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;
    const {
      theme: { dark },
    } = useNebuiaThemeContext();

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center rounded font-medium',
          !small && 'px-4 py-2',
          small && 'px-2 py-1',
          'focus:outline-none focus-visible:ring focus-visible:ring-nebuia-primary-500',
          'shadow-sm',
          'transition-colors duration-75',
          center && 'justify-center',
          //#region  //*=========== Variants ===========
          [
            variant === 'error' && [
              'bg-red-500 text-white',
              'border border-red-600',
              'hover:bg-red-600 hover:text-white',
              'active:bg-red-500',
              'disabled:bg-red-400 disabled:hover:bg-red-400',
            ],
            variant === 'primary' && [
              'bg-nebuia-primary-500 text-white',
              'border border-nebuia-primary-600',
              'hover:bg-nebuia-primary-600 hover:text-white',
              'active:bg-nebuia-primary-500',
              'disabled:bg-nebuia-primary-300 disabled:hover:bg-nebuia-primary-300',
            ],
            variant === 'outline' && [
              'text-nebuia-primary-500',
              'border border-nebuia-primary-500',
              'hover:bg-primary-50 active:bg-nebuia-primary-100 disabled:bg-nebuia-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-nebuia-primary-500',
              'shadow-none',
              !dark &&
                'hover:bg-nebuia-primary-50 active:bg-nebuia-primary-100 disabled:bg-nebuia-primary-100',
              dark &&
                'hover:bg-nebuia-primary-700 active:bg-nebuia-primary-700 disabled:bg-nebuia-primary-700 hover:text-white',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'light' && [
              'bg-white text-dark ',
              'border border-gray-300',
              'hover:bg-gray-100 hover:text-dark',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-gray-900 text-white',
              'border border-gray-600',
              'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-nebuia-primary-500': ['outline', 'ghost'].includes(
                  variant,
                ),
              },
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
export default Button;
