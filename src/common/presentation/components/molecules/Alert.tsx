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
export const Alert: FC<AlertProps> = ({ message, title, variant }) => {
  const { dark } = useTheme().theme;

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
        'px-4 py-2 rounded-lg flex gap-4 items-center w-full max-w-md',
        dark ? 'shadow-md' : 'bg-slate-900',
      )}
    >
      <div className="flex items-center gap-2">
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
            'w-1 h-16',
          )}
        ></div>
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
            'text-white rounded-full p-2',
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex grow flex-col gap-1">
        {message && <P className="font-bold">{title}</P>}
        {message &&
          (Array.isArray(message) ? message : [message]).map((m) => (
            <P className="font-light" key={m}>
              {m}
            </P>
          ))}
      </div>
    </div>
  );
};
