import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';

import 'react-phone-input-2/lib/semantic-ui.css';

import Button from '../../../../../common/presentation/components/atoms/buttons/Button';
import { P } from '../../../../../common/presentation/components/atoms/P';
import clsxm from '../../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';
import { ParamCallback } from '../../../../domain/types/ParamCallback';
import { useNebuiaSdk } from '../../../hooks/UseRepository';
import { useWidgetConfig } from '../../../providers/WidgetConfig/Context';

export type CommonProps = {
  onContinue: ParamCallback<string>;
  value?: string;
};
type Props = CommonProps & {
  validator: (value: string) => boolean;
  type: 'email' | 'phone';
  initialValue?: string;
};
export const Input: FC<Props> = ({
  onContinue,
  value,
  type,
  validator,
  initialValue,
}) => {
  const { language } = useWidgetConfig();
  const sdk = useNebuiaSdk();
  const [_value, setValue] = useState(initialValue ?? value);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { dark } = useTheme().theme;

  const isValid = useMemo(() => validator(_value ?? ''), [_value, validator]);

  const send = useCallback(async () => {
    if (!isValid || !_value) {
      return;
    }
    let value;
    if (type === 'phone') {
      // TODO
      value = _value.replace(/\s/g, '');
      value = value.startsWith('+') ? value : `+${value}`;
    } else {
      value = _value.replace(/\s/g, '');
    }

    if (!value) {
      return;
    }

    setLoading(true);
    await sdk.saveEmailPhone({
      toEmail: type === 'email',
      value,
    });
    await sdk.generateOTPCode({
      toEmail: type === 'email',
    });
    setLoading(false);
    onContinue(value);
  }, [_value, isValid, onContinue, sdk, type]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
      className="mx-auto w-full max-w-md space-y-8"
    >
      <div className="w-full">
        <label htmlFor={type} className="block w-full">
          <P className="text-sm font-light leading-6">
            {t(`pages.emailPhone.inputLabel.${type}`)}
          </P>
        </label>
        <div className="mt-2 flex gap-2 rounded-md shadow-sm">
          <div className="relative flex grow items-stretch focus-within:z-10 email-phone-container">
            {type === 'email' && (
              <input
                value={_value}
                onChange={(e) => setValue(e.target.value)}
                type="email"
                name={type}
                id={type}
                readOnly={!!initialValue}
                disabled={!!initialValue}
                className={clsxm(
                  'block w-full rounded-lg',
                  'border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-nebuia-primary-600 sm:text-sm sm:leading-6',
                  !dark &&
                    'text-gray-900 ring-gray-300 placeholder:text-gray-400',
                  dark &&
                    'text-gray-100 ring-gray-700 placeholder:text-gray-500 bg-slate-800',
                  {
                    'read-only:bg-gray-200 read-only:text-gray-400': !dark,
                    'read-only:bg-gray-700 read-only:text-gray-500': dark,
                  },
                  'read-only:focus:ring-0',
                )}
                placeholder={'example@gmail.com'}
              />
            )}
            {type === 'phone' && (
              <PhoneInput
                localization={language === 'es' ? es : undefined}
                autoFormat
                dropdownClass={clsxm(
                  dark && '!bg-slate-800 text-gray-100 hover:!bg-slate-800',
                )}
                preferredCountries={['mx']}
                containerClass={clsxm(
                  // only for dark mode
                  dark && '!bg-slate-800',
                )}
                copyNumbersOnly
                value={value}
                onChange={(value) => {
                  setValue(value);
                }}
                disabled={!!initialValue}
                inputStyle={{
                  backgroundColor: dark ? 'rgb(107,114,128)' : '#fff',
                }}
                inputClass={clsxm(
                  'focus:ring-nebuia-primary-600',
                  !dark &&
                    'text-gray-900 ring-gray-300 placeholder:text-gray-400',
                  dark &&
                    'text-gray-100 ring-gray-700 placeholder:text-gray-500 !bg-slate-800',
                  {
                    'disabled:bg-gray-200 disabled:text-gray-400': !dark,
                    'disabled:bg-gray-700 disabled:text-gray-500': dark,
                  },
                )}
              />
            )}
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid}
            small
            className="!px-4"
            isLoading={loading}
          >
            {t('pages.emailPhone.sendOtp')}
          </Button>
        </div>
      </div>
      <P className="mx-auto w-full max-w-sm text-center">
        {t(`pages.emailPhone.instructions.${type}`)}
      </P>
    </form>
  );
};
