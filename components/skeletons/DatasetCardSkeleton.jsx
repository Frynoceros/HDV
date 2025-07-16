import { SkeletonBase, SkeletonLine, SkeletonText } from './SkeletonBase';

export default function DatasetCardSkeleton() {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-lg shadow-sm ring-1 ring-gray-200 overflow-hidden">
      {/* Card Header skeleton */}
      <div className="bg-gray-200 p-4">
        <div className="flex items-center justify-between">
          <SkeletonBase className="h-10 w-10 rounded-full" />
          <SkeletonBase className="h-6 w-6 rounded" />
        </div>
      </div>

      {/* Card Content skeleton */}
      <div className="flex-1 p-6">
        {/* Title skeleton - 2 lines with minimum height */}
        <div className="min-h-[3.5rem] mb-2">
          <SkeletonLine className="h-5 w-full mb-2" />
          <SkeletonLine className="h-5 w-3/4" />
        </div>
        
        {/* Description skeleton - 3 lines with minimum height */}
        <div className="min-h-[4rem] mt-2">
          <SkeletonText lines={3} className="space-y-1" />
        </div>
        
        {/* Organization skeleton */}
        <div className="mt-4">
          <SkeletonLine className="h-3 w-32" />
        </div>
      </div>

      {/* Card Footer skeleton */}
      <div className="mt-auto px-6 py-3 bg-gray-50 border-t border-gray-100">
        <SkeletonLine className="h-4 w-24" />
      </div>
    </div>
  );
}

export function DatasetCardSkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <DatasetCardSkeleton key={i} />
      ))}
    </div>
  );
}