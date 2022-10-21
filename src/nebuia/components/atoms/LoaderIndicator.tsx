import { FC } from 'react';

import Skeleton from '../../../lib/components/molecules/Skeleton';
import { SizedBox, SizedBozSize } from './SizedBox';

export const LoaderIndicator: FC<{ size?: keyof typeof SizedBozSize }> = ({
  size = 's55',
}) => {
  return (
    <SizedBox height={size} width={size} className="w-full mx-auto">
      <Skeleton color="blue" className="rounded-full">
        <SizedBox height={size} width={size}></SizedBox>
      </Skeleton>
    </SizedBox>
  );
};
