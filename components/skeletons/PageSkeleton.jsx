import { SkeletonBase, SkeletonLine, SkeletonText } from './SkeletonBase';

export default function PageSkeleton({ 
  showHeader = true,
  showSidebar = false,
  children
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <SkeletonLine className="h-8 w-64 mb-2" />
                <SkeletonLine className="h-5 w-96" />
              </div>
              {showSidebar && (
                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                  <SkeletonBase className="h-10 w-64 rounded-md" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

export function DatasetPageSkeleton() {
  return (
    <PageSkeleton>
      <div className="space-y-6">
        {/* Dataset header */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <SkeletonLine className="h-8 w-64" />
            <SkeletonBase className="h-10 w-32 rounded-md" />
          </div>
          <SkeletonText lines={2} />
        </div>

        {/* Tabs navigation */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonLine key={i} className="h-4 w-16" />
              ))}
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            <SkeletonText lines={4} className="mb-6" />
            
            {/* Data resources */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <SkeletonBase className="h-12 w-12 rounded" />
                  <div className="flex-1">
                    <SkeletonLine className="h-4 w-48 mb-2" />
                    <SkeletonLine className="h-3 w-32" />
                  </div>
                  <SkeletonBase className="h-8 w-20 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}