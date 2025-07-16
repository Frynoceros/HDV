import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from './Pagination';
import Loading from './Loading';
import { DatasetCardSkeletonGrid } from './skeletons';
import { MagnifyingGlassIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function DatasetMain({ 
  datasets, 
  currentPage, 
  setCurrentPage, 
  totalCount, 
  pageSize, 
  searchTerm, 
  setSearchTerm, 
  debouncedSearchTerm,
  isSearching, 
  loading 
}) {
  if (!datasets) {
    return <Loading />;
  }

  // Use the datasets directly as they're already paginated from the server
  const paginatedDatasets = datasets;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                Hawaii Open Datasets
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {isSearching ? (
                  <>Found {totalCount} datasets matching "{debouncedSearchTerm}"</>
                ) : (
                  <>Explore {totalCount} public datasets from Hawaii government agencies</>
                )}
              </p>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search datasets..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    // Page reset is handled by the useEffect in the parent component
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <DatasetCardSkeletonGrid count={pageSize} />
        ) : paginatedDatasets.length === 0 ? (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No datasets found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or browse all datasets.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedDatasets.map(({ title, name, notes, organization }) => (
                <Link
                  key={name}
                  href={`/datasets/${name}`}
                  className="group relative flex flex-col h-full bg-white rounded-lg shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300 transition-all duration-200 overflow-hidden"
                >
                  {/* Card Header with Icon */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                    <div className="flex items-center justify-between">
                      <Image
                        src="/seal.png"
                        width={40}
                        height={40}
                        alt="Hawaii state seal"
                        className="opacity-90"
                      />
                      <ChartBarIcon className="h-6 w-6 text-white opacity-75" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3 min-h-[4rem]">
                      {notes || 'No description available'}
                    </p>
                    {organization && (
                      <p className="mt-4 text-xs text-gray-500">
                        {organization.title}
                      </p>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-auto px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                      View dataset →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                loading={loading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}