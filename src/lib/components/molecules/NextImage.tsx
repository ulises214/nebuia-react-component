import { useState } from 'react';

import clsxm from '../../common/utils/clsxm';

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
  width: string | number;
  src: string;
  className?: string;
} & (
  | { width: string | number; height: string | number }
  | { layout: 'fill'; width?: string | number; height?: string | number }
);

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps): JSX.Element {
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete');
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <img
        className={clsxm(
          imgClassName,
          status === 'loading' && clsxm('animate-pulse', blurClassName),
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={(): void => setStatus('complete')}
        {...rest}
      />
    </figure>
  );
}
