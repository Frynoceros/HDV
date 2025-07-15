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
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Navbar.jsx      # Top navigation bar
│   ├── SearchBar.jsx   # Dataset search functionality
│   ├── ChartGenerator.jsx  # Main chart generation logic
│   ├── Graph.jsx       # Chart configuration interface
│   └── charts/         # Individual chart components
│       ├── LineChart.jsx
│       ├── BarChart.jsx
│       └── ... (8 chart types total)
├── pages/              # Next.js pages (Pages Router)
│   ├── _app.jsx        # App initialization
│   ├── index.jsx       # Homepage
│   ├── datasets/       # Dataset routes
│   ├── groups/         # Group routes
│   ├── organizations/  # Organization routes
│   └── api/           # API routes (currently unused)
├── styles/             # Global styles
├── lib/               # Utility functions
└── public/            # Static assets
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

## Known Issues & Technical Debt

### Performance Issues
1. **Initial Load**: Fetches all 1500 datasets on app initialization
2. **No Caching**: Every page reload fetches all data again
3. **No Pagination**: Large datasets load entirely into memory
4. **Client-Side Rendering**: No SSR/SSG implementation

### Mobile Responsiveness
1. **Fixed Layouts**: Components use hard-coded grid columns
2. **No Mobile Navigation**: Sidebar always visible, no hamburger menu
3. **Table Overflow**: Horizontal scrolling not optimized for touch
4. **Chart Sizing**: Fixed heights don't adapt to mobile screens

### Code Quality
1. **Hardcoded Values**: API URLs, magic numbers throughout
2. **Duplicated Code**: Chart components share 90% similarity
3. **Props Drilling**: Deep component hierarchies
4. **No Error Handling**: Failed API calls show blank screens
5. **Console Logs**: Development logs in production

### Outdated Patterns
1. **Direct DOM Manipulation**: Using getElementById instead of React refs
2. **No TypeScript**: Pure JavaScript with no type safety
3. **Commented Code**: Unused API routes and features
4. **Mixed Concerns**: Components handle both logic and presentation

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
Currently, no environment variables are configured. API URLs are hardcoded.

### Best Practices Moving Forward
1. **Use Context7 MCP**: When implementing new features, use "use context7" to get current documentation
2. **Mobile-First**: Design components for mobile, then enhance for desktop
3. **Type Safety**: Gradually migrate to TypeScript
4. **Component Extraction**: Break down large components into smaller, reusable pieces
5. **Error Boundaries**: Implement proper error handling
6. **Performance**: Use React.memo, useMemo, and useCallback where appropriate

## MCP Integration Guide

### Using Context7 for Documentation
When working on features, prefix prompts with "use context7" to get current docs:
- "use context7: Next.js 15 app router migration"
- "use context7: Chart.js responsive configuration"
- "use context7: Tailwind CSS v4 mobile breakpoints"

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