import { FC, useMemo } from 'react';

import styles from './Loader.module.css';

export const Loader: FC = () => {
  const circleCount = useMemo(() => [0, 1, 2], []);

  return (
    <div className={styles['custom-loader']}>
      {circleCount.map((i) => (
        <div
          className={styles['circle']}
          style={{
            animationDelay: `${(i - circleCount.length) * 0.1}s`,
          }}
          key={i}
        ></div>
      ))}
    </div>
  );
};
