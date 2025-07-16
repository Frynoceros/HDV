import React, { useState, useEffect } from 'react';
import DatasetMain from '../../components/DatasetMain';
import { useDatasets, useDatasetSearch } from '../../hooks';
import { PageSkeleton } from '../../components/skeletons';
import { DEFAULT_QUERY_PARAMS } from '../../constants';

export default function DatasetsIndex() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const pageSize = DEFAULT_QUERY_PARAMS.PAGE_SIZE;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, searchTerm]);

  // Use React Query for data fetching
  const isSearching = debouncedSearchTerm.trim().length >= 2;
  
  const datasetsQuery = useDatasets(
    currentPage, 
    pageSize, 
    isSearching ? '' : debouncedSearchTerm, // Clear search term for normal browsing
    { enabled: !isSearching } // Only run when not searching
  );
  
  const searchQuery = useDatasetSearch(debouncedSearchTerm, {
    page: currentPage,
    pageSize,
    enabled: isSearching
  });

  // Use appropriate query based on search state
  const activeQuery = isSearching ? searchQuery : datasetsQuery;
  const { data, isLoading, error, isFetching, isPreviousData } = activeQuery;

  // Loading state
  if (isLoading) {
    return <PageSkeleton variant="grid" count={12} />;
  }

  // Error state with retry option
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <p className="text-red-600 mb-4">Failed to load datasets.</p>
          <button
            onClick={() => activeQuery.refetch()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Show loading indicator for background fetching */}
      {isFetching && !isLoading && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-indigo-600 text-white px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Updating...</span>
            </div>
          </div>
        </div>
      )}
      
      <DatasetMain 
        datasets={data?.results || []} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={data?.count || 0}
        pageSize={pageSize}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        debouncedSearchTerm={debouncedSearchTerm}
        isSearching={isSearching}
        loading={isLoading}
        // Additional React Query states for better UX
        isFetching={isFetching}
        isPreviousData={isPreviousData}
      />
    </div>
  );
}
