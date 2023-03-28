import { forwardRef } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';

enum RawButtonColor {
  'white',
  'primary',
}
type RawButtonProps = React.ComponentPropsWithRef<'button'> & {
  fillcolor: keyof typeof RawButtonColor;
  elevation?: boolean;
};
export const RawButton = forwardRef<HTMLButtonElement, RawButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type="button"
        className={clsxm(
          'h-full w-full rounded-full',
          props.elevation && 'shadow-sm',
          props.fillcolor === 'white' &&
            'bg-white hover:bg-gray-300 active:bg-gray-300',
          props.fillcolor === 'primary' &&
            'bg-primary-500 hover:bg-primary-700 active:bg-primary-700',
          'border border-transparent focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2',
        )}
      ></button>
    );
  },
);

RawButton.displayName = 'RawButton';
