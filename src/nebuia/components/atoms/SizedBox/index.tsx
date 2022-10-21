import { FC, PropsWithChildren } from 'react';

import clsxm from '../../../../lib/common/utils/clsxm';

export enum SizedBozSize {
  's5',
  's10',
  's15',
  's30',
  's35',
  's55',
  's60',
  's90',
  's250',
  's280',
  's300',
  's340',
  's400',
}

type SizedBoxSizeProps = {
  height?: keyof typeof SizedBozSize;
  width?: keyof typeof SizedBozSize;
  className?: string;
};

export const SizedBox: FC<PropsWithChildren<SizedBoxSizeProps>> = ({
  height,
  width,
  children,
  className,
}) => {
  return (
    <div
      className={clsxm(
        className,
        height && `height-${height}`,
        width && `width-${width}`,
      )}
    >
      {children}
    </div>
  );
};
