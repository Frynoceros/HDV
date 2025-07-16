import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { datasetService } from '../services/api';
import { queryKeys } from '../lib/queryClient';
import { API_CONFIG } from '../constants';

// Custom hook for fetching paginated datasets
export function useDatasets(page = 1, pageSize = 30, searchTerm = '', options = {}) {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: queryKeys.datasetList(page, pageSize, searchTerm),
    queryFn: async () => {
      const start = (page - 1) * pageSize;
      
      if (searchTerm.trim()) {
        return await datasetService.search(searchTerm, { start, rows: pageSize });
      } else {
        return await datasetService.getAll(pageSize, start);
      }
    },
    // Keep previous data while fetching new page
    placeholderData: (previousData) => previousData,
    // Merge any additional options
    ...options,
  });
}

// Custom hook for fetching a specific dataset by ID
export function useDataset(datasetId) {
  return useQuery({
    queryKey: queryKeys.datasetById(datasetId),
    queryFn: () => datasetService.getById(datasetId),
    enabled: !!datasetId, // Only run if datasetId exists
    staleTime: 10 * 60 * 1000, // 10 minutes - datasets rarely change
  });
}

// Custom hook for fetching dataset data (for charts/tables)
export function useDatasetData(datasetId) {
  return useQuery({
    queryKey: queryKeys.datasetData(datasetId),
    queryFn: async () => {
      if (!datasetId) return null;
      
      // First get dataset info to find resources
      const dataset = await datasetService.getById(datasetId);
      if (!dataset || !dataset.resources || dataset.resources.length === 0) {
        throw new Error('Dataset has no resources');
      }
      
      // First, try to find resources with datastore_active
      const datastoreResources = dataset.resources.filter(resource => 
        resource.datastore_active === true && resource.id
      );
      
      // If no datastore resources, try CSV resources
      const csvResources = datastoreResources.length > 0 
        ? datastoreResources 
        : dataset.resources.filter(resource => 
            resource.format === 'CSV' && resource.id
          );
      
      if (csvResources.length === 0) {
        // If no CSV or datastore resources, check if it's an external link
        const htmlResource = dataset.resources.find(resource => 
          resource.format === 'HTML' && resource.url
        );
        
        if (htmlResource) {
          // Return a special response for external datasets
          return {
            headers: [],
            data: [],
            externalUrl: htmlResource.url,
            message: 'This dataset is available at an external website'
          };
        }
        
        throw new Error('No data resources available for this dataset');
      }
      
      // Get the first available resource
      const resource = csvResources[0];
      
      // Fetch the actual data using OData with JSON format
      const url = `${API_CONFIG.ODATA_BASE_URL}/${resource.id}?$format=json`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      
      const response = await res.json();
      
      return {
        headers: response.value && response.value.length > 0 ? Object.keys(response.value[0]) : [],
        data: response.value || []
      };
    },
    enabled: !!datasetId,
    staleTime: 5 * 60 * 1000, // 5 minutes for data
    retry: 3, // Retry more for data fetching as it can be flaky
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Custom hook for search with debouncing built-in
export function useDatasetSearch(searchTerm, options = {}) {
  const { page = 1, pageSize = 30, enabled = true } = options;
  
  return useQuery({
    queryKey: queryKeys.search(searchTerm, { page, pageSize }),
    queryFn: () => datasetService.search(searchTerm, { 
      start: (page - 1) * pageSize, 
      rows: pageSize 
    }),
    enabled: enabled && searchTerm.length >= 2, // Only search with 2+ characters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    placeholderData: (previousData) => previousData,
  });
}

// Custom hook for groups
export function useGroups() {
  return useQuery({
    queryKey: queryKeys.groupList(),
    queryFn: () => datasetService.getGroups(),
    staleTime: 15 * 60 * 1000, // 15 minutes - groups change rarely
  });
}

// Custom hook for specific group
export function useGroup(groupId) {
  return useQuery({
    queryKey: queryKeys.groupById(groupId),
    queryFn: () => datasetService.getGroupById(groupId),
    enabled: !!groupId,
    staleTime: 15 * 60 * 1000,
  });
}

// Custom hook for organizations
export function useOrganizations() {
  return useQuery({
    queryKey: queryKeys.organizationList(),
    queryFn: () => datasetService.getOrganizations(),
    staleTime: 15 * 60 * 1000, // 15 minutes - organizations change rarely
  });
}

// Custom hook for specific organization
export function useOrganization(orgId) {
  return useQuery({
    queryKey: queryKeys.organizationById(orgId),
    queryFn: () => datasetService.getOrganizationById(orgId),
    enabled: !!orgId,
    staleTime: 15 * 60 * 1000,
  });
}

// Mutation hook for any future data updates (if needed)
export function useUpdateDataset() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => datasetService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch dataset
      queryClient.invalidateQueries({ queryKey: queryKeys.datasetById(variables.id) });
      // Also invalidate list queries
      queryClient.invalidateQueries({ queryKey: queryKeys.datasets });
    },
  });
}

// Hook to prefetch data for better UX
export function usePrefetchDataset() {
  const queryClient = useQueryClient();
  
  return (datasetId) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.datasetById(datasetId),
      queryFn: () => datasetService.getById(datasetId),
      staleTime: 5 * 60 * 1000,
    });
  };
}