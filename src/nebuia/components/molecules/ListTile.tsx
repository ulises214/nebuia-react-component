import { FC } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';
import { P, SizedBox } from '../atoms';

type ListTileProps = {
  leading?: JSX.Element;
  title: string | JSX.Element;
  subtitle?: string;
  trailing?: JSX.Element;
  elevation?: boolean;
  className?: string;
  onClick?: () => void;
};
export const ListTile: FC<ListTileProps> = ({
  leading,
  onClick,
  subtitle,
  title,
  trailing,
  elevation,
  className,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onKeyDown={(ev) => {
        ev.preventDefault();
        if (ev.key === 'Enter') {
          onClick?.();
        }
        ev.stopPropagation();
      }}
      onClick={onClick}
      className={clsxm(
        'flex w-full items-center justify-center rounded-xl',
        className,
        elevation && 'shadow-md',
      )}
    >
      {leading && <SizedBox width="s5" />}
      {leading && <div className="shrink-0">{leading}</div>}
      <SizedBox width="s15" />
      <div className="flex-1">
        {typeof title === 'string' && (
          <P bold className="flex-1">
            {title}
          </P>
        )}
        {typeof title !== 'string' && title}
        {subtitle && (
          <P secondary small className="flex-1">
            {subtitle}
          </P>
        )}
      </div>
      <SizedBox width="s15" />
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
};
