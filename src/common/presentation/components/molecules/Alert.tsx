import {
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { FC } from 'react';

import styles from './Alert.module.css';

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
        styles['alert'],
        dark ? styles['dark'] : styles['light'],
        variant === 'success' && styles['success'],
        variant === 'error' && styles['error'],
        variant === 'warning' && styles['warning'],
        variant === 'info' && styles['info'],
      )}
    >
      <div className="flex items-center gap-2">
        <div className={clsxm('w-1 h-16', styles['line'])}></div>
        <div className={clsxm('', styles['icon'])}>
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
