import { FC, JSX } from 'react';

import clsxm from '../../utils/clsxm';
import Button from '../atoms/buttons/Button';
import { P } from '../atoms/P';

type Props = {
  icon?: JSX.Element;
  suffix?: JSX.Element;
  title: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  subTitle?: string;
  className?: string;
};
export const CardTile: FC<Props> = ({
  title,
  isActive,
  icon,
  onClick,
  suffix,
  disabled,
  subTitle,
  className,
}) => {
  return (
    <Button
      variant={'outline'}
      disabled={disabled}
      onClick={onClick}
      className={clsxm(
        'p-4 border border-solid flex items-center justify-start gap-4 w-full max-w-md',
        isActive && '!border-nebuia-primary-500',
        className,
      )}
    >
      {icon}
      <P className="flex grow flex-col justify-center gap-1 text-left">
        <span>{title}</span>
        {subTitle && <span className="text-xs font-thin">{subTitle}</span>}
      </P>
      {suffix && <div className="h-8 w-8">{suffix}</div>}
    </Button>
  );
};
