import clsxm from '@utils/clsxm';
import { forwardRef, InputHTMLAttributes } from 'react';

import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};
export const InlineInputFile = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    const {
      theme: { dark },
    } = useTheme();

    return (
      <label
        className={clsxm('font-thin block mb-2 text-xs', {
          'text-666': dark,
          'text-gray-900': !dark,
        })}
        htmlFor={props.id}
      >
        {label}
        <input
          {...props}
          className={clsxm(
            'block w-full text-sm border  rounded-md cursor-pointer focus:outline-none  ',
            {
              'text-gray-900 border-gray-300 bg-gray-50': !dark,
              'text-gray-400 bg-gray-700 border-gray-600 placeholder:text-gray-400':
                dark,
            },
          )}
          id={props.id}
          type="file"
          ref={ref}
        />
      </label>
    );
  },
);

InlineInputFile.displayName = 'InlineInputFile';
