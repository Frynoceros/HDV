import { API_CONFIG, API_ENDPOINTS, DEFAULT_QUERY_PARAMS } from '../constants';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Generic fetch wrapper with error handling and retries
async function fetchWithRetry(url, options = {}, retries = API_CONFIG.MAX_RETRIES) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        await response.text()
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (retries > 0 && error.name !== 'AbortError') {
      console.warn(`Retrying API call, ${retries} attempts remaining...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }

    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408, null);
    }

    throw error;
  }
}

// Dataset Service
export const datasetService = {
  // Get all datasets with optional pagination and field filtering
  async getAll(limit = DEFAULT_QUERY_PARAMS.DATASETS_LIMIT, start = 0, fields = null) {
    let url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.PACKAGE_SEARCH}?rows=${limit}&start=${start}`;
    if (fields) {
      url += `&fl=${fields}`;
    }
    const response = await fetchWithRetry(url);
    return response.result;
  },

  // Get dataset by ID
  async getById(id) {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.PACKAGE_SHOW}?id=${id}`;
    const response = await fetchWithRetry(url);
    return response.result;
  },

  // Get dataset data from resource
  async getResourceData(resourceId) {
    const url = `${API_CONFIG.ODATA_BASE_URL}/${resourceId}`;
    const response = await fetchWithRetry(url);
    return response.value;
  },

  // Search datasets
  async search(query, facets = {}) {
    const params = new URLSearchParams({
      q: query,
      rows: DEFAULT_QUERY_PARAMS.PAGE_SIZE,
      ...facets,
    });
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.PACKAGE_SEARCH}?${params}`;
    const response = await fetchWithRetry(url);
    return response.result;
  },
};

// Group Service
export const groupService = {
  // Get all groups
  async getAll() {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.GROUP_LIST}?all_fields=true`;
    const response = await fetchWithRetry(url);
    return response.result;
  },

  // Get group by ID
  async getById(id) {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.GROUP_SHOW}?id=${id}&include_datasets=true`;
    const response = await fetchWithRetry(url);
    return response.result;
  },
};

// Organization Service
export const organizationService = {
  // Get all organizations
  async getAll() {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.ORGANIZATION_LIST}?all_fields=true`;
    const response = await fetchWithRetry(url);
    return response.result;
  },

  // Get organization by ID
  async getById(id) {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.ORGANIZATION_SHOW}?id=${id}&include_datasets=true`;
    const response = await fetchWithRetry(url);
    return response.result;
  },
};

// Cache implementation
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

export function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

// Export a default API object
const api = {
  datasets: datasetService,
  groups: groupService,
  organizations: organizationService,
};

export default api;