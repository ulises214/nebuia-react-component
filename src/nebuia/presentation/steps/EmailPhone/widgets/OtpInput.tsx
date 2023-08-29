import React, { FC, useEffect, useRef, useState } from 'react';

import clsxm from '../../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';

type Props = {
  onChange: (otp: string) => void;
  readonly?: boolean;
  value?: string;
};
export const OtpInput: FC<Props> = ({ onChange, readonly, value }) => {
  const { dark } = useTheme().theme;
  const [otp, setOtp] = useState(
    ['', '', '', '', '', ''].map((v, i) => value?.charAt(i) ?? v),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const otpValue = otp.join('');
    onChange(otpValue);
  }, [otp, onChange]);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number,
  // ) => {
  //   const value = e.target.value;

  //   if (isNaN(Number(value)) || value === '') {
  //     return;
  //   }
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);

  //   if (index < 5) {
  //     inputRefs.current[index + 1]?.focus();
  //   }
  // };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);

    const pasteDigits = pasteData.replace(/[^0-9]/g, ''); // Filtrar solo números

    const newOtp = [...otp];
    for (let i = 0; i < pasteDigits.length && i < 6; i++) {
      newOtp[i] = pasteDigits[i] ?? '';
    }
    setOtp(newOtp);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    } else if (!isNaN(parseInt(e.key, 10))) {
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex flex-row gap-2">
      {otp.map((digit, index) => (
        <input
          readOnly={readonly}
          disabled={readonly}
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          // onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onChange={() => {}}
          onPaste={handlePaste}
          className={clsxm(
            'h-14 md:h-16 xl:h-20 aspect-[14/20]',
            'xl:text-4xl md:text-3xl text-xl',
            'rounded-md border-2 border-gray-300 text-center focus:border-nebuia-primary-600 focus:outline-none',
            dark && 'text-gray-100 ring-gray-700 placeholder:text-gray-500',
            {
              'read-only:bg-gray-200 read-only:text-gray-400': !dark,
              'read-only:bg-gray-700 read-only:text-gray-500': dark,
            },
            'read-only:focus:ring-0',
          )}
        />
      ))}
    </div>
  );
};
