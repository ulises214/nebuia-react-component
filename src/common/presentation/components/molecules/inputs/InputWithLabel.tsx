import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import clsxm from '@utils/clsxm';
import { FC, useState } from 'react';

import { ParamCallback } from '../../../../../nebuia/domain/types/ParamCallback';
import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';

type InputType = 'email' | 'password' | 'text' | 'number';

type Props = {
  type: InputType;
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: ParamCallback<string>;
  onChangeEvent?: ParamCallback<React.ChangeEvent<HTMLInputElement>>;
  required?: boolean;
  errorMessage?: string;
  className?: string;
  readonly?: boolean;
  autoComplete?: boolean;
  extraSmall?: boolean;
  onFocus?: () => void;
  subLabel?: string;
  button?: JSX.Element;
};

export const ShowHideIcon: FC<{
  setType: (inputType: InputType) => void;
  type: InputType;
}> = ({ setType, type }) => {
  return (
    <div className={'nebuia-icon-wrapper'}>
      {type === 'password' && (
        <EyeIcon className={'nebuia-icon'} onClick={() => setType('text')} />
      )}
      {type === 'text' && (
        <EyeSlashIcon
          className={'nebuia-icon'}
          onClick={() => setType('password')}
        />
      )}
    </div>
  );
};

export const InputWithLabel: FC<Props> = ({
  type: propsType,
  id,
  label,
  onChange,
  placeholder,
  value,
  required,
  errorMessage,
  onChangeEvent,
  className,
  readonly,
  autoComplete,
  extraSmall,
  onFocus,
  subLabel,
  button,
}) => {
  const [type, setType] = useState(propsType);
  const {
    theme: { text, dark, secondaryBackground },
  } = useTheme();

  return (
    <div
      className={clsxm(
        className,
        extraSmall && 'nebuia-input-wrapper-extra-small',
      )}
    >
      <label
        id={`${id}-label`}
        style={{ color: text }}
        htmlFor={id}
        className={'nebuia-label'}
      >
        {label}
      </label>
      {subLabel && <p className={'nebuia-sub-label'}>{subLabel}</p>}
      <div className={'nebuia-input-wrapper'}>
        <div className="flex w-full items-end justify-center gap-1">
          <input
            value={value}
            onChange={(e) => {
              onChange?.(e.target.value);
              onChangeEvent?.(e);
            }}
            id={id}
            name={id}
            disabled={readonly}
            placeholder={placeholder}
            type={type}
            required={required}
            onFocus={onFocus}
            autoComplete={autoComplete ? id : 'off'}
            style={{
              color: text,
              backgroundColor: dark ? secondaryBackground : 'white',
            }}
            className={clsxm(
              'nebuia-input-disabled',
              dark ? 'input-dark' : 'input-light',
              'nebuia-input',
              errorMessage && 'nebuia-input-error',
              errorMessage && dark && 'nebuia-input-error-dark',
            )}
          />
          {button && <div className={'nebuia-button-wrapper'}>{button}</div>}
        </div>
        {propsType === 'password' && (
          <ShowHideIcon type={type} setType={setType} />
        )}
      </div>

      {!readonly && (
        <p
          className={clsxm(
            'nebuia-error-message',
            !errorMessage && 'nebuia-error-message-invisible',
            !errorMessage && 'select-none',
          )}
        >
          {errorMessage ?? 'texto'}
        </p>
      )}
    </div>
  );
};
