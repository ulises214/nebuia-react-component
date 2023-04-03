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
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAkCAIAAAC2bqvFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg1NDVGMjAxMENBQjExRTY5QUY0ODkzQjk2OUU0M0Y1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg1NDVGMjAyMENBQjExRTY5QUY0ODkzQjk2OUU0M0Y1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODU0NUYxRkYwQ0FCMTFFNjlBRjQ4OTNCOTY5RTQzRjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODU0NUYyMDAwQ0FCMTFFNjlBRjQ4OTNCOTY5RTQzRjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7iSL9AAAADA0lEQVR42uzX3U9ScRgH8AMHPHB4O6hAvNggMMF8TdJqzRalzunStXGhW3Vjlt1009ZmF1l3TbuqCzevarOLWtPWizPNVHydIKizBqiJIIiAiIJwPOdA/gPdON2O2/n+Ac/v99l+e57nRwMeVAGHDhrvbmlrvHDt0AW2v/xYNjbRYfahK9CBEx4KQAEoAAWgABTg+IIl9oJuZywcOL4jGMdUlyCw2NbGwmC3Y7hnM5xSn79suPMoXaY6AYDtiA/fj4VmR6c+d0GZ0hTE9vj+Wj9+sFgtD9teZ+mKyP6E4omYf3UU2PupytXuba55vH6xkMOEYIdtobO1Jb4TJjUAT4SkYpVYXhZB9HypJhBJ2ld2A1FchLBzNPJo0DXe+47UAHRnecU57PG7NIUNvj82HkzzRTFEwJUJWTiAQWzmxOA3DCfICMAwFMf3WRlFcQLAgi56ZCaFZNnXIuUFEhCRGJpeaMrqQESTYiEEhqaAFOkA/UNdvg0HuDgj5ctYPMg20sGD1jlMcC2Ezptn58yT9fcfF96ol+n0kai/92s7QeDk6kI8JiGE6Use1tt5W0OhTKc2AiAUiyqGph3edfP7Nx0rc+NV91qTNDaBhmEmHQQZ5ALk5hpcnmU4+9KUZcZrTtZy5KhSqbhZ1VjcXzQdZ3BL3esJhseRV3tr0f5LX1xDujmQBksmZjvrRGcGmo3tg2N9W/tWk8kfwwywNynQq2CxXSOu1uWjidDo5Kfs7KukAwj4YmNNi9M5BqTK1LorS2Hgmcwk8VteuvnlkhxUpKpOhVhyweam9a7xabpQSsY2iojymDxlT1/nRShYK0v6dwPZwbHnwEgGbVtwSne7JN808Gp1wy2WHeUwPuJVoiCvUioUeleHcZ9bk6H9rmwS43RFJt0++uR3SWVtRTOSqSX1LkSn0SSKUm66likwEyAY3fEJYnGu+jSroEJ99jqbzT8Z2ygH5uflGg5m1TnlfgJIctMggEY7Yev0QQ6uzIDSuNSPjAJQAApAASgABfh//gkwAPRKLsZIXtSBAAAAAElFTkSuQmCCMTY4Mw=='
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
