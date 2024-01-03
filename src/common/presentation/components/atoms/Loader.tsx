import { FC, useMemo } from 'react';

export const Loader: FC = () => {
  const circleCount = useMemo(() => [0, 1, 2], []);

  return (
    <div className="flex justify-center items-center">
      {circleCount.map((i) => (
        <div
          style={{
            animationDelay: `${(i - circleCount.length) * 0.1}s`,
          }}
          className="w-4 h-4 rounded-full mx-1 origin-center relative bg-nebuia-primary-500 animate-circle-loader"
          key={i}
        ></div>
      ))}
    </div>
  );
};
