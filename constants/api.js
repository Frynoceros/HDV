// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://opendata.hawaii.gov/api/3/action',
  ODATA_BASE_URL: process.env.NEXT_PUBLIC_ODATA_BASE_URL || 'https://opendata.hawaii.gov/datastore/odata3.0',
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  MAX_RETRIES: parseInt(process.env.NEXT_PUBLIC_MAX_RETRIES || '3'),
};

// API Endpoints
export const API_ENDPOINTS = {
  PACKAGE_SEARCH: '/package_search',
  PACKAGE_SHOW: '/package_show',
  GROUP_LIST: '/group_list',
  GROUP_SHOW: '/group_show',
  ORGANIZATION_LIST: '/organization_list',
  ORGANIZATION_SHOW: '/organization_show',
};

// API Query Parameters
export const DEFAULT_QUERY_PARAMS = {
  DATASETS_LIMIT: parseInt(process.env.NEXT_PUBLIC_MAX_DATASETS_FETCH || '1500'),
  PAGE_SIZE: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || '30'),
};