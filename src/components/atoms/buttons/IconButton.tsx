import { ComponentPropsWithRef, forwardRef } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';
import { useNebuiaThemeContext } from '../../../nebuia/context/NebuiaThemeContext';

type IconButtonProps = ComponentPropsWithRef<'button'>;
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      theme: { dark },
    } = useNebuiaThemeContext();

    return (
      <button
        ref={ref}
        {...props}
        type="button"
        className={clsxm(
          props.className,
          'inline-flex items-center rounded-full border border-transparent bg-transparent p-3  shadow-sm  focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2',
          !dark && ['text-white hover:bg-gray-200'],
          dark && ['text-gray-200 hover:bg-gray-700'],
        )}
      >
        {props.children}
      </button>
    );
  },
);
IconButton.displayName = 'IconButton';
