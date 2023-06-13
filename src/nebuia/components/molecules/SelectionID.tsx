import { FC } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';

import Button from '../../../components/atoms/buttons/Button';
import NextImage from '../../../components/molecules/NextImage';
import { VoidCallback } from '../../../lib/common/VoidCallback';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
import { P } from '../atoms';

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
    <Button
      onClick={() => void action()}
      variant="outline"
      className="flex flex-row items-center"
    >
      <NextImage
        src={icon}
        alt={title}
        width={26}
        height={26}
        className="w-10"
      />
      <div className="flex grow flex-col items-start">
        <P bold className="flex-1">
          {title}
        </P>
        <P secondary small className="flex-1">
          {subtitle}
        </P>
      </div>
      <MdOutlineNavigateNext color={theme.text} />
    </Button>
  );
};
