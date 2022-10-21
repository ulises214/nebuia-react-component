import { FC } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';

import { VoidCallback } from '../../../lib/common/VoidCallback';
import { IconButton } from '../../../lib/components/atoms/buttons/IconButton';
import NextImage from '../../../lib/components/molecules/NextImage';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
import { ListTile } from './ListTile';

type SelectionIDProps = {
  icon: string;
  title: string;
  subtitle: string;
  action: VoidCallback;
};
export const SelectionID: FC<SelectionIDProps> = ({
  action,
  icon,
  subtitle,
  title,
}) => {
  const { theme } = useNebuiaThemeContext();

  return (
    <div className="border border-gray-400 rounded-sm">
      <ListTile
        className="p-2"
        leading={
          <NextImage
            src={icon}
            alt={title}
            width={26}
            height={26}
            className="w-10"
          />
        }
        title={title}
        subtitle={subtitle}
        trailing={
          <IconButton onClick={() => void action()}>
            <MdOutlineNavigateNext color={theme.text} />
          </IconButton>
        }
      />
    </div>
  );
};
