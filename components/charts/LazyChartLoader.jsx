import React, { Suspense, lazy } from 'react';
import { ChartSkeleton } from '../skeletons';
import { registerChartJS } from './ChartRegistry';

// Lazy load all chart components
const LineChart = lazy(() => import('./LineChart'));
const VerticalBarChart = lazy(() => import('./VerticalBarChart'));
const HorizontalBarChart = lazy(() => import('./HorizontalBarChart'));
const PieChart = lazy(() => import('./PieChart'));
const DoughnutChart = lazy(() => import('./DoughnutChart'));
const AreaChart = lazy(() => import('./AreaChart'));
const RadarChart = lazy(() => import('./RadarChart'));
const ScatterChart = lazy(() => import('./ScatterChart'));
const PolarAreaChart = lazy(() => import('./PolarArea'));

// Chart type mapping
const chartComponents = {
  'Line Chart': LineChart,
  'Vertical Bar Chart': VerticalBarChart,
  'Horizontal Bar Chart': HorizontalBarChart,
  'Pie Chart': PieChart,
  'Doughnut Chart': DoughnutChart,
  'Area Chart': AreaChart,
  'Radar Chart': RadarChart,
  'Scatter Chart': ScatterChart,
  'Polar Area Chart': PolarAreaChart,
};

// Error boundary for chart loading failures
class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Chart loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 p-8 border border-red-200 rounded-lg bg-red-50">
          <div className="text-red-600 mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-red-800 mb-1">Chart Loading Failed</h3>
          <p className="text-xs text-red-600 text-center mb-3">
            There was an error loading the chart component. Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
function ChartLoadingFallback({ chartType }) {
  const type = chartType?.toLowerCase().replace(' chart', '').replace(' ', '-') || 'default';
  
  return (
    <div className="flex flex-col items-center justify-center h-64 p-8">
      <ChartSkeleton type={type} />
      <p className="mt-4 text-sm text-gray-500">Loading {chartType || 'Chart'}...</p>
    </div>
  );
}

// Main lazy chart loader component
export default function LazyChartLoader({ chartType, ...chartProps }) {
  // Only register Chart.js modules when a chart is actually being rendered
  React.useEffect(() => {
    if (chartType && chartComponents[chartType]) {
      registerChartJS();
    }
  }, [chartType]);

  // Get the appropriate chart component
  const ChartComponent = chartComponents[chartType];

  if (!ChartComponent) {
    return (
      <div className="flex items-center justify-center h-64 p-8 border border-gray-200 rounded-lg bg-gray-50">
        <div className="text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            {chartType ? `Unknown chart type: ${chartType}` : 'Please select a chart type'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ChartErrorBoundary>
      <Suspense fallback={<ChartLoadingFallback chartType={chartType} />}>
        <ChartComponent {...chartProps} />
      </Suspense>
    </ChartErrorBoundary>
  );
}