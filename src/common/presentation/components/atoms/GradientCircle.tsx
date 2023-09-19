import { FC, useMemo } from 'react';

import clsxm from '../../utils/clsxm';

export const GradientCircle: FC<{
  className?: string;
}> = ({ className }) => {
  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * 10) + 1;
  }, []);

  return (
    <div
      className={clsxm(
        'h-6 w-6 rounded-full bg-gradient-to-b',
        [
          'from-[#6847a2] to-[#d4037d]',
          'from-blue-500 via-blue-400 to-green-400',
          'from-purple-500 via-purple-400 to-pink-400',
          'from-red-500 via-yellow-500 to-yellow-300',
          'from-cyan-500 via-teal-400 to-orange-500',
          'from-pink-500 via-red-400 to-yellow-500',
          'from-green-500 via-blue-400 to-purple-500',
          'from-yellow-500 via-red-400 to-pink-500',
          'from-teal-500 via-green-400 to-blue-500',
          'from-purple-600 via-pink-400 to-red-500',
        ].sort(() => Math.random() - 0.5)[randomIndex - 1],
        className,
      )}
    />
  );
};
