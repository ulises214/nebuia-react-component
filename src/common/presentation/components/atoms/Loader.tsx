import { FC } from 'react';

import styles from './Loader.module.css';

import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';

export const Loader: FC = () => {
  const {
    theme: { primary },
  } = useTheme();
  const circleCount = 3;

  return (
    <div className={styles['custom-loader']}>
      {Array.from({ length: circleCount }).map((_, i) => (
        <div
          className={styles['circle']}
          style={{
            backgroundColor: primary,
            animationDelay: `${(i - circleCount) * 0.1}s`,
          }}
          key={i}
        ></div>
      ))}
    </div>
  );
};
