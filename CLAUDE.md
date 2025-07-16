# Hawaii Data Visualizer (HDV) - Project Documentation

## Overview

Hawaii Data Visualizer is a Next.js web application that provides interactive visualization and exploration of Hawaii's open data. Built to connect with the Hawaii Open Data API, it allows users to browse datasets, create various chart visualizations, and analyze public data through an intuitive interface.

## Current Tech Stack

### Core Dependencies
- **Next.js**: 15.4.1 (recently upgraded from 12.3.1)
- **React**: 19.1.0 (recently upgraded from 18.2.0)
- **Node.js**: Requires 18.0.0 or higher

### UI & Styling
- **Tailwind CSS**: 4.1.11 (recently upgraded from 3.1.8)
- **@headlessui/react**: 2.2.4 - Unstyled, accessible UI components
- **@heroicons/react**: 2.2.0 - SVG icon library
- **Tailwind Plugins**:
  - @tailwindcss/forms: 0.5.10
  - @tailwindcss/typography: 0.5.16
  - @tailwindcss/aspect-ratio: 0.4.2

### Data Visualization
- **Chart.js**: 4.5.0 - Canvas-based charting library
- **react-chartjs-2**: 5.3.0 - React wrapper for Chart.js

### Development Tools
- **ESLint**: 9.31.0 (upgraded from 8.25.0)
- **PostCSS**: 8.5.6 with @tailwindcss/postcss
- **Autoprefixer**: 10.4.21

### MCP Servers Configured
- **Context7**: Provides up-to-date documentation for libraries
- **Playwright**: Browser automation and testing capabilities

## Project Structure

```
HDV/
├── components/          # Reusable React components
│   ├── UnifiedLayout.jsx   # Main layout handling desktop/mobile (NEW)
│   ├── Layout.jsx          # Legacy layout wrapper
│   ├── Sidebar.jsx         # Navigation sidebar (FIXED: nested anchor tags)
│   ├── Navbar.jsx          # Top navigation bar
│   ├── MobileNavigation.jsx # Mobile slide-over menu (NEW)
│   ├── SearchBar.jsx       # Dataset search functionality
│   ├── ChartGenerator.jsx  # Main chart generation logic
│   ├── Graph.jsx           # Chart configuration interface
│   ├── ErrorBoundary.jsx   # Error boundary component (NEW)
│   ├── LoadingState.jsx    # Enhanced loading components (NEW)
│   ├── Loading.jsx         # Original loading component
│   └── charts/             # Individual chart components
│       ├── LineChart.jsx
│       ├── BarChart.jsx
│       └── ... (8 chart types total)
├── pages/              # Next.js pages (Pages Router)
│   ├── _app.jsx        # App initialization (with ErrorBoundary)
│   ├── AppWrapper.jsx  # Context provider (updated with API service)
│   ├── index.jsx       # Homepage
│   ├── datasets/       # Dataset routes
│   ├── groups/         # Group routes
│   ├── organizations/  # Organization routes
│   └── api/           # API routes (currently unused)
├── constants/          # Application constants (NEW)
│   ├── api.js         # API configuration and endpoints
│   ├── ui.js          # UI constants and breakpoints
│   └── index.js       # Barrel export
├── services/           # API service layer (NEW)
│   └── api.js         # Centralized API calls with error handling
├── hooks/              # Custom React hooks (NEW)
│   ├── useApi.js      # Generic API hook with caching
│   └── index.js       # Barrel export
├── styles/             # Global styles
├── lib/               # Utility functions
├── public/            # Static assets
├── .env.local         # Environment variables (NEW)
├── .env.example       # Environment template (NEW)
├── CLAUDE.md          # Project documentation (THIS FILE)
└── REFACTORING_PLAN.md # Phased modernization strategy (NEW)
```

## Key Features

### 1. Dataset Exploration
- Browse 1500+ public datasets from Hawaii Open Data
- Search datasets by title with autocomplete
- View dataset metadata and descriptions
- Navigate by groups and organizations

### 2. Data Visualization
- 8 chart types: Line, Bar (Vertical/Horizontal), Scatter, Pie, Doughnut, Area, Radar
- Interactive chart configuration
- Download charts as PNG images
- Transform tabular data into visual insights

### 3. Data Interaction
- View raw data in sortable tables
- Select specific rows for visualization
- Multiple axis configuration for complex charts
- Real-time chart updates

## API Integration

The app integrates with Hawaii Open Data Portal API:
- Base URL: `https://opendata.hawaii.gov/api/3/action/`
- Endpoints used:
  - `package_search`: List all datasets
  - `package_show`: Get dataset details
  - OData endpoint for actual data retrieval

## Recent Improvements & Current Status

### ✅ Phase 1 Complete - Foundation & Critical Fixes
1. **Environment Configuration**: Created `.env.local` and `.env.example` with all API configurations
2. **Constants Organization**: Centralized all hardcoded values in `/constants` directory
3. **API Service Layer**: Implemented centralized API calls with error handling, retries, and caching
4. **Custom Hooks**: Created reusable hooks for data fetching with built-in caching
5. **Error Handling**: Added ErrorBoundary component for graceful error handling
6. **Loading States**: Created enhanced loading components with multiple variants
7. **Bug Fix**: Fixed critical nested anchor tag issue in Sidebar component
8. **Code Cleanup**: Removed all console.log statements from production code

### ✅ Additional Fixes (January 2025)
1. **Link Component Migration**: Fixed all `<Link>` components with nested `<a>` tags for Next.js 15 compatibility
2. **Tailwind CSS v4 Configuration**: Updated PostCSS config and globals.css for Tailwind CSS 4.1.11
3. **Navigation Errors**: Resolved runtime errors preventing page navigation

### ✅ Recently Completed (January 2025)

#### Performance Optimization
1. **Dataset Loading Optimization**: 
   - Fixed critical issue where all 1500 datasets loaded on every page
   - Implemented lazy loading strategy - datasets only fetch when needed
   - Search functionality now fetches minimal data (name, title only)
   - Individual pages fetch their own data independently
   - AppWrapper now intelligently loads data based on route

#### Mobile-First Responsive Design
1. **Mobile Navigation System**: 
   - Created MobileNavigation component with Tailwind UI slide-over menu
   - Added hamburger menu button to Navbar
   - Implemented responsive layout wrapper
   - Full mobile navigation support with smooth transitions

2. **Modern UI Components**:
   - Redesigned homepage with beautiful hero section and feature highlights
   - Created responsive Card and GridList components
   - Updated DatasetMain with modern grid layout and inline search
   - Modernized Sidebar with better visual hierarchy
   - All components now mobile-responsive

3. **Design System**:
   - Consistent use of Tailwind UI patterns
   - Gradient headers for visual interest
   - Proper hover states and transitions
   - Touch-friendly tap targets

#### Layout Architecture
1. **Unified Layout System**:
   - Created UnifiedLayout component to handle both desktop and mobile views
   - Fixed navbar and sidebar overlap issues on desktop
   - Desktop: Fixed sidebar with search in top header
   - Mobile: Hamburger menu with slide-over navigation
   - Consistent branding across all viewports

### ✅ Latest Improvements (January 2025)
1. **Table Pagination**: Added robust pagination to dataset detail pages with 25 entries default
2. **Mobile Chart Responsiveness**: Charts now adapt to screen size with proper scaling
3. **Skeleton Loaders**: Enhanced loading states across the application
4. **React Key Fixes**: Resolved all React key warnings in Table component

### 🚧 Still In Progress
1. **Touch gestures** for data tables
2. **Infinite scroll** as alternative to pagination

## Remaining Technical Debt

### Performance Issues
1. **No Server-Side Rendering**: Client-side rendering only
2. **Large Bundle Size**: No code splitting implemented
3. **Client-side Pagination**: Currently using client-side pagination for datasets

### Areas for Improvement
1. **Touch gestures**: Data tables need touch gestures for mobile interaction
2. **Search Performance**: Could implement server-side search for large datasets

### Code Quality
1. **Duplicated Code**: Chart components share 90% similarity
2. **Props Drilling**: Some deep component hierarchies remain
3. **No TypeScript**: Pure JavaScript with no type safety
4. **Direct DOM Manipulation**: Still using getElementById in some places

## Development Guidelines

### Running the Project
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Environment Variables
Configure your `.env.local` file with the following variables:
```bash
# Hawaii Open Data API Configuration
NEXT_PUBLIC_API_BASE_URL=https://opendata.hawaii.gov/api/3/action
NEXT_PUBLIC_ODATA_BASE_URL=https://opendata.hawaii.gov/datastore/odata3.0

# API Configuration
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_MAX_RETRIES=3

# Pagination
NEXT_PUBLIC_DEFAULT_PAGE_SIZE=30
NEXT_PUBLIC_MAX_DATASETS_FETCH=1500

# Development
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Best Practices Moving Forward
1. **Use Context7 MCP**: When implementing new features, use "use context7" to get current documentation
2. **Mobile-First**: Design components for mobile, then enhance for desktop
3. **Type Safety**: Gradually migrate to TypeScript
4. **Component Extraction**: Break down large components into smaller, reusable pieces
5. **Error Boundaries**: Implement proper error handling
6. **Performance**: Use React.memo, useMemo, and useCallback where appropriate

## MCP Integration Guide

### Using Context7 for Documentation
Context7 provides up-to-date, version-specific documentation directly in your development workflow.

**How to use:**
1. Write your coding request normally
2. Add "use context7" at the end of your prompt
3. Receive current, accurate documentation and code examples

**Examples:**
- "Create a Next.js 15 server component with data fetching. use context7"
- "Configure Chart.js 4 for responsive mobile charts. use context7"
- "Set up Tailwind CSS 4 with mobile-first breakpoints. use context7"
- "Implement React 19 error boundaries with suspense. use context7"

**Note:** Context7 prevents outdated or hallucinated code by pulling documentation directly from official sources.

### Using Playwright for Testing
Playwright MCP can be used for:
- E2E testing of user flows
- Visual regression testing
- Mobile viewport testing
- Performance profiling

## Quick Reference

### Common Tasks

**Add a New Chart Type**
1. Create component in `/components/charts/`
2. Register Chart.js modules
3. Add to Graph.jsx chart types array
4. Implement data transformation logic

**Add a New Page**
1. Create file in `/pages/` directory
2. Add navigation link in Sidebar.jsx
3. Implement data fetching in useEffect
4. Wrap with Layout component

**Update API Endpoints**
1. Locate hardcoded URL in component
2. Consider creating constants file
3. Update error handling
4. Test with different network conditions

### Component Hierarchy
```
_app.jsx
  └─ AppWrapper (Context Provider)
      └─ Layout
          ├─ Navbar
          │   └─ SearchBar
          ├─ Sidebar
          └─ Main Content
              ├─ Pages (index, datasets, etc.)
              └─ ChartGenerator
                  ├─ Graph (Configuration)
                  └─ Chart Components
```

## Working With This Codebase

### Getting Started
1. Review this documentation to understand the current state
2. Check `REFACTORING_PLAN.md` for the modernization roadmap
3. Set up your `.env.local` file using `.env.example` as a template
4. Run `npm install` and `npm run dev` to start developing

### Key Files to Know
- `/services/api.js` - All API calls go through here
- `/constants/` - All configuration and constants
- `/hooks/useApi.js` - Custom hooks for data fetching
- `/components/ErrorBoundary.jsx` - Handles app-wide errors
- `/components/LoadingState.jsx` - Various loading components

### Current Focus Areas
1. **Mobile Responsiveness** (Phase 2) - Making the app work well on all devices
2. **Performance** (Phase 3) - Implementing pagination and caching
3. **Code Quality** (Phase 4) - TypeScript migration and testing

## Next Steps

See `REFACTORING_PLAN.md` for a detailed, phased approach to modernizing this codebase with:
- Mobile-first responsive design
- Performance optimizations
- Modern Next.js patterns
- TypeScript migration
- Comprehensive testing

---

*Last Updated: January 2025*
*Next.js 15.4.1 | React 19.1.0 | Tailwind CSS 4.1.11*

### Recent Changes Log
- **Jan 2025**: Phase 1 complete - Foundation and critical fixes
- **Jan 2025**: Fixed critical nested anchor tag bug in Sidebar
- **Jan 2025**: Implemented API service layer with error handling
- **Jan 2025**: Added environment variables configuration
- **Jan 2025**: Removed all console.logs from production