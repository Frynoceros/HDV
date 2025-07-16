import { QueryClient } from '@tanstack/react-query';

// Create a query client with optimized defaults for this project
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes when not in use
      gcTime: 10 * 60 * 1000,
      // Retry failed requests twice
      retry: 2,
      // Don't refetch on window focus (datasets don't change frequently)
      refetchOnWindowFocus: false,
      // Refetch on network reconnection
      refetchOnReconnect: true,
      // Don't refetch on mount if data is fresh
      refetchOnMount: 'stale',
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
});

// Query keys factory for consistent cache management
export const queryKeys = {
  // Base keys
  datasets: ['datasets'],
  groups: ['groups'],
  organizations: ['organizations'],
  
  // Specific dataset queries
  datasetList: (page = 1, pageSize = 30, search = '') => [
    ...queryKeys.datasets,
    'list',
    { page, pageSize, search }
  ],
  datasetById: (id) => [...queryKeys.datasets, 'detail', id],
  datasetData: (id) => [...queryKeys.datasets, 'data', id],
  
  // Group queries
  groupList: () => [...queryKeys.groups, 'list'],
  groupById: (id) => [...queryKeys.groups, 'detail', id],
  
  // Organization queries
  organizationList: () => [...queryKeys.organizations, 'list'],
  organizationById: (id) => [...queryKeys.organizations, 'detail', id],
  
  // Search queries
  search: (term, options = {}) => ['search', term, options],
};