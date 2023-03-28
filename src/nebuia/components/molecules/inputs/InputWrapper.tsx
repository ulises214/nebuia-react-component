import { FC } from 'react';

import Button from '../../../../components/atoms/buttons/Button';
import { Optional } from '../../../../lib/common/Optional';
import clsxm from '../../../../lib/common/utils/clsxm';
import { useNebuiaThemeContext } from '../../../context/NebuiaThemeContext';
import { fancyTimeFormat } from '../../../utils/fancyTimer';

export type OnInputChange = (arg0: string) => void;
enum InputType {
  'email',
  'number',
  'text',
  'tel',
}
export type InputProps = {
  action?: () => void;
  write: OnInputChange;
  error?: boolean;
  placeholder?: string;
  value: string;
  trailing?: JSX.Element;
  readonly?: boolean;
  actionDisabled?: boolean;
  countDown?: Optional<number>;
};
type InputWrapperProps = {
  type: keyof typeof InputType;
} & InputProps;
export const InputWrapper: FC<InputWrapperProps> = ({
  action,
  type,
  write,
  value,
  error = false,
  placeholder,
  readonly,
  trailing,
  actionDisabled,
  countDown,
}) => {
  const { theme } = useNebuiaThemeContext();

  return (
    <div
      className={clsxm(
        'flex h-12 w-full flex-row items-center justify-evenly rounded-tl-sm rounded-bl-sm rounded-tr-md rounded-br-md border',
        error ? 'border-red-500' : 'border-gray-400',
      )}
    >
      {trailing}
      <input
        disabled={readonly}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => {
          write(e.target.value);
        }}
        className={clsxm(
          'disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none',
          '!focus:border-none h-full w-full border-none border-transparent active:border-none',
        )}
        style={{ color: theme.text }}
      />
      {action && (
        <div className="h-full">
          <Button
            disabled={error || actionDisabled}
            className="h-full"
            variant={error ? 'error' : 'primary'}
            onClick={action}
          >
            {!countDown && 'Enviar'}
            {countDown && fancyTimeFormat(countDown)}
          </Button>
        </div>
      )}
    </div>
  );
};
