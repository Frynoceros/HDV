// Legacy hooks (will be phased out)
export { useApi } from './useApi';

// New optimized hooks
export { useResponsiveChart } from './useResponsiveChart';
export { useTouch, useLongPress } from './useTouch';

// React Query hooks (preferred for data fetching)
export * from './useQueries';