import {
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { FC } from 'react';

import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import clsxm from '../../utils/clsxm';
import { P } from '../atoms/P';

export const AlertVariants = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
} as const;
export type AlertVariants = (typeof AlertVariants)[keyof typeof AlertVariants];
type AlertProps = {
  variant: AlertVariants;
  title?: string;
  message?: string[] | string;
};

const Icon: FC<{ variant: AlertVariants }> = ({ variant }) => {
  const {
    theme: { dark },
  } = useTheme();
  const Icon = (() => {
    switch (variant) {
      case 'success':
        return CheckIcon;
      case 'error':
        return ExclamationTriangleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'info':
        return InformationCircleIcon;
    }
  })();

  return (
    <div
      className={clsxm(
        variant === 'success' && {
          'bg-[#0a6b20]': dark,
          'bg-[#12b76a]': !dark,
        },
        variant === 'error' && {
          'bg-[#d92d20]': !dark,
          'bg-[#a30e0b]': dark,
        },
        variant === 'warning' && {
          'bg-[#ffc107]': !dark,
          'bg-[#b78103]': dark,
        },
        variant === 'info' && {
          'bg-[#2196f3]': !dark,
          'bg-[#0e6cb7]': dark,
        },
        'text-white rounded-full p-1',
      )}
    >
      <Icon className="size-4" />
    </div>
  );
};

export const Alert: FC<AlertProps> = ({ message, title, variant }) => {
  const {
    theme: { dark },
  } = useTheme();

  return (
    <div
      className={clsxm(
        'border-l-4 p-4',
        variant === 'warning' && {
          'border-yellow-400 bg-yellow-50': !dark,
          'border-yellow-500 bg-yellow-100': dark,
        },
        variant === 'success' && {
          'border-green-400 bg-green-50': !dark,
          'border-green-500 bg-green-100': dark,
        },
        variant === 'error' && {
          'border-red-400 bg-red-50': !dark,
          'border-red-500 bg-red-100': dark,
        },
        variant === 'info' && {
          'border-blue-400 bg-blue-50': !dark,
          'border-blue-500 bg-blue-100': dark,
        },
      )}
    >
      <div className="flex">
        <div className="shrink-0">
          <Icon variant={variant} />
        </div>
        <div className="ml-3">
          {message && (
            <P
              className={clsxm(
                'font-bold',
                variant === 'warning' && 'text-yellow-800',
                variant === 'success' && 'text-green-800',
                variant === 'error' && 'text-red-800',
                variant === 'info' && 'text-blue-800',
              )}
            >
              {title}
            </P>
          )}
          {message &&
            (Array.isArray(message) ? message : [message]).map((m) => (
              <P
                className={clsxm(
                  'font-light',
                  variant === 'warning' && 'text-yellow-800',
                  variant === 'success' && 'text-green-800',
                  variant === 'error' && 'text-red-800',
                  variant === 'info' && 'text-blue-800',
                )}
                key={m}
              >
                {m}
              </P>
            ))}
        </div>
      </div>
    </div>
  );
};
