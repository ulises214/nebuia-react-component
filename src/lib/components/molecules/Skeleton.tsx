import clsxm from '../../common/utils/clsxm';

enum SkeletonColor {
  'blue',
  'gray',
}
type SkeletonProps = {
  color?: keyof typeof SkeletonColor;
} & React.ComponentPropsWithoutRef<'div'>;
export default function Skeleton({
  className,
  color,
  ...rest
}: SkeletonProps): JSX.Element {
  return (
    <div
      className={clsxm(
        'animate-shimmer',
        color === 'blue' ? 'bg-[#B1DFFB]' : 'bg-[#f6f7f8]',
        className,
      )}
      style={{
        backgroundImage:
          color === 'blue'
            ? 'linear-gradient(to right, #B1DFFB 0%, #D8EFFD 20%, #B1DFFB 40%, #B1DFFB 100%)'
            : 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
