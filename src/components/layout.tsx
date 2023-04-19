import { FC, PropsWithChildren } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';

import clsxm from '../lib/common/utils/clsxm';
import { H1, SizedBox } from '../nebuia/components/atoms';
import { useNebuiaStepsContext } from '../nebuia/context/NebuiaStepsContext';
import { IconButton } from './atoms/buttons/IconButton';
import NextImage from './molecules/NextImage';

export const Layout: FC<PropsWithChildren<{ enableBackground?: boolean }>> = ({
  children,
  enableBackground = false,
}) => {
  const { view, title, finishStep } = useNebuiaStepsContext();

  return (
    <div
      className={clsxm(
        enableBackground && 'bg-nebuia-background',
        'p-1',
        'flex flex-col items-center',
        'w-full max-w-md h-full',
      )}
    >
      <SizedBox height="s15" />
      <NextImage
        className="w-full max-w-[4rem] lg:max-w-[6rem] xl:max-w-[8rem]"
        width="640"
        height="84"
        src="https://i.ibb.co/Vvr94nP/powerby-ver1.png"
        alt="Powered by NebuIA"
      />
      <div className="flex w-full items-center gap-2">
        {view && (
          <IconButton
            className="!p-1"
            onClick={() => {
              finishStep();
            }}
          >
            <MdArrowBackIosNew className="h-6 w-6 text-black" />
          </IconButton>
        )}
        <H1 center className="grow">
          {title}
        </H1>
      </div>
      <SizedBox height="s15" />
      {children}
    </div>
  );
};
