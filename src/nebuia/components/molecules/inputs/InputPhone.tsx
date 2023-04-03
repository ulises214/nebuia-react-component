import { FC } from 'react';

import NextImage from '../../../../components/molecules/NextImage';
import clsxm from '../../../../lib/common/utils/clsxm';
import { P, SizedBox } from '../../atoms';
import { InputProps, InputWrapper } from './InputWrapper';

export const InputPhone: FC<InputProps> = ({
  write,
  action,
  error = false,
  value,
  placeholder,
  readonly,
  actionDisabled,
  countDown,
}) => {
  return (
    <InputWrapper
      trailing={
        <div
          className={clsxm(
            readonly && 'bg-slate-200 text-slate-500',
            'h-full flex items-center justify-center',
          )}
        >
          <SizedBox width="s5" />
          <NextImage
            alt="Mexico flag"
            src={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAkCAIAAAC2bqvFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u'
            }
            width={64}
            height={36}
            className="w-6"
          />
          <SizedBox width="s5" />
          <P small>+52</P>
          <SizedBox width="s5" />
        </div>
      }
      placeholder={placeholder}
      value={value}
      type="tel"
      write={write}
      action={action}
      error={error}
      readonly={readonly}
      actionDisabled={actionDisabled}
      countDown={countDown}
    />
  );
};
