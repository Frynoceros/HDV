import { useState, useEffect, useCallback } from 'react';
import { getCachedData, setCachedData } from '../services/api';

// Generic hook for API calls with caching
export function useApi(apiCall, params = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { 
    enabled = true, 
    cacheKey = null,
    onSuccess = null,
    onError = null,
  } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    // Check cache first
    if (cacheKey) {
      const cached = getCachedData(cacheKey);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...params);
      setData(result);
      
      // Cache the result
      if (cacheKey) {
        setCachedData(cacheKey, result);
      }

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      setError(err);
      if (onError) {
        onError(err);
      } else {
        console.error('API Error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [apiCall, params, enabled, cacheKey, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    // Clear cache if exists
    if (cacheKey) {
      getCachedData(cacheKey);
    }
    return fetchData();
  }, [fetchData, cacheKey]);

  return { data, loading, error, refetch };
}

// Specific hooks for common API calls
export function useDatasets(limit, start = 0) {
  return useApi(
    async () => {
      const { datasetService } = await import('../services/api');
      return datasetService.getAll(limit, start);
    },
    [limit, start],
    { cacheKey: `datasets-${limit}-${start}` }
  );
}

export function useDataset(id) {
  return useApi(
    async () => {
      const { datasetService } = await import('../services/api');
      return datasetService.getById(id);
    },
    [id],
    { 
      enabled: !!id,
      cacheKey: `dataset-${id}` 
    }
  );
}

export function useDatasetResource(resourceId) {
  return useApi(
    async () => {
      const { datasetService } = await import('../services/api');
      return datasetService.getResourceData(resourceId);
    },
    [resourceId],
    { 
      enabled: !!resourceId,
      cacheKey: `resource-${resourceId}` 
    }
  );
}

export function useGroups() {
  return useApi(
    async () => {
      const { groupService } = await import('../services/api');
      return groupService.getAll();
    },
    [],
    { cacheKey: 'groups-all' }
  );
}

export function useGroup(id) {
  return useApi(
    async () => {
      const { groupService } = await import('../services/api');
      return groupService.getById(id);
    },
    [id],
    { 
      enabled: !!id,
      cacheKey: `group-${id}` 
    }
  );
}

export function useOrganizations() {
  return useApi(
    async () => {
      const { organizationService } = await import('../services/api');
      return organizationService.getAll();
    },
    [],
    { cacheKey: 'organizations-all' }
  );
}

export function useOrganization(id) {
  return useApi(
    async () => {
      const { organizationService } = await import('../services/api');
      return organizationService.getById(id);
    },
    [id],
    { 
      enabled: !!id,
      cacheKey: `organization-${id}` 
    }
  );
}