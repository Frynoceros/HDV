import { SkeletonBase, SkeletonLine } from './SkeletonBase';

export default function ChartSkeleton({ type = 'bar', className = '' }) {
  const renderChartSkeleton = () => {
    switch (type) {
      case 'pie':
      case 'doughnut':
        return (
          <div className="flex items-center justify-center h-64">
            <SkeletonBase className="h-48 w-48 rounded-full" />
          </div>
        );
      
      case 'line':
        return (
          <div className="h-64 flex items-end space-x-2 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <SkeletonBase 
                  className="w-full bg-blue-200" 
                  style={{ height: `${Math.random() * 100 + 50}px` }}
                />
                <SkeletonLine className="h-3 w-8 mt-2" />
              </div>
            ))}
          </div>
        );
      
      case 'radar':
        return (
          <div className="flex items-center justify-center h-64">
            <SkeletonBase className="h-48 w-48 rounded-full border-8 border-gray-300" />
          </div>
        );
      
      case 'scatter':
        return (
          <div className="h-64 p-4 relative">
            <SkeletonBase className="w-full h-full rounded" />
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonBase
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`
                }}
              />
            ))}
          </div>
        );
      
      default: // bar, horizontal-bar, area
        return (
          <div className="h-64 flex items-end space-x-2 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <SkeletonBase 
                  className="w-full" 
                  style={{ height: `${Math.random() * 150 + 50}px` }}
                />
                <SkeletonLine className="h-3 w-12 mt-2" />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ring-1 ring-gray-200 ${className}`}>
      {/* Chart title skeleton */}
      <div className="p-4 border-b border-gray-200">
        <SkeletonLine className="h-6 w-48" />
      </div>
      
      {/* Chart content skeleton */}
      <div className="p-4">
        {renderChartSkeleton()}
      </div>
      
      {/* Chart legend skeleton */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <SkeletonBase className="h-3 w-3 rounded-sm" />
              <SkeletonLine className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}