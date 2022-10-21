import { ComponentPropsWithRef, forwardRef } from 'react';

import clsxm from '../../../common/utils/clsxm';

type IconButtonProps = ComponentPropsWithRef<'button'>;
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type="button"
        className={clsxm(
          props.className,
          'inline-flex items-center rounded-full border border-transparent bg-transparent p-3 text-white shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2',
        )}
      >
        {props.children}
      </button>
    );
  },
);
IconButton.displayName = 'IconButton';
