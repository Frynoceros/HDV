import { cn } from '../../lib/utils';

export function SkeletonBase({ className, ...props }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-gray-200',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className
      )}
      {...props}
    />
  );
}

export function SkeletonLine({ className, ...props }) {
  return (
    <SkeletonBase
      className={cn('h-4 w-full', className)}
      {...props}
    />
  );
}

export function SkeletonCircle({ className, ...props }) {
  return (
    <SkeletonBase
      className={cn('h-8 w-8 rounded-full', className)}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className, ...props }) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}