import { FC } from 'react';

import Skeleton from '../../../components/molecules/Skeleton';
import { SizedBox, SizedBozSize } from './SizedBox';

export const LoaderIndicator: FC<{ size?: keyof typeof SizedBozSize }> = ({
  size = 's55',
}) => {
  return (
    <SizedBox height={size} width={size} className="mx-auto w-full">
      <Skeleton color="blue" className="rounded-full">
        <SizedBox height={size} width={size}></SizedBox>
      </Skeleton>
    </SizedBox>
  );
};
