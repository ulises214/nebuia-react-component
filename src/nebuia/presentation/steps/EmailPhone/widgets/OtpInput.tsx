import { FC } from 'react';
import OtpInputLib from 'react-otp-input';

import clsxm from '../../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';

type Props = {
  onChange: (otp: string) => void;
  readonly?: boolean;
  value?: string;
};
export const OtpInput: FC<Props> = ({ onChange, readonly, value }) => {
  const { dark } = useTheme().theme;

  return (
    <OtpInputLib
      value={value}
      onChange={onChange}
      numInputs={6}
      containerStyle={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        maxWidth: '400px',
      }}
      renderInput={(props) => (
        <input
          {...props}
          style={{
            ...props.style,
            width: undefined,
            height: undefined,
            fontSize: undefined,
          }}
          readOnly={readonly}
          disabled={readonly}
          className={clsxm(
            '!h-14 md:!h-16 xl:!h-20 !aspect-[14/20]',
            'xl:text-2xl md:text-xl text-lg',
            'rounded-md border-2 border-gray-300 text-center focus:border-nebuia-primary-600 focus:outline-none',
            dark && 'text-gray-100 ring-gray-700 placeholder:text-gray-500',
            {
              'read-only:bg-gray-200 read-only:text-gray-400': !dark,
              'read-only:bg-gray-700 read-only:text-gray-500': dark,
            },
            'read-only:focus:ring-0',
          )}
        />
      )}
    />
  );
};
