// UI Constants
export const CHART_TYPES = [
  { value: 'line', label: 'Line Chart' },
  { value: 'bar', label: 'Bar Chart (Vertical)' },
  { value: 'horizontalBar', label: 'Bar Chart (Horizontal)' },
  { value: 'scatter', label: 'Scatter Plot' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'doughnut', label: 'Doughnut Chart' },
  { value: 'area', label: 'Area Chart' },
  { value: 'radar', label: 'Radar Chart' },
];

// Grid Configuration
export const GRID_CONFIG = {
  MOBILE_COLS: 1,
  TABLET_COLS: 2,
  DESKTOP_COLS: 3,
};

// Chart Configuration
export const CHART_CONFIG = {
  MAX_HEIGHT: '24rem', // max-h-96 in Tailwind
  DEFAULT_COLORS: [
    '#3B82F6', // blue-500
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#14B8A6', // teal-500
    '#F97316', // orange-500
  ],
  DOWNLOAD_FILENAME_PREFIX: 'chart',
};

// Navigation Items
export const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: 'HomeIcon' },
  { name: 'Datasets', href: '/datasets', icon: 'DatabaseIcon' },
  { name: 'Groups', href: '/groups', icon: 'UserGroupIcon' },
  // { name: 'Organizations', href: '/organizations', icon: 'OfficeBuildingIcon' },
  // { name: 'Tags', href: '/tags', icon: 'TagIcon' },
  // { name: 'Formats', href: '/formats', icon: 'DocumentTextIcon' },
  // { name: 'Licenses', href: '/licenses', icon: 'DocumentDuplicateIcon' },
];

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};