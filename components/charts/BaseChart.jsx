import React, { useRef, useEffect, useState } from 'react';
import { useResponsiveChart } from '../../hooks';
import { registerChartJS } from './ChartRegistry';

/**
 * BaseChart - A unified chart component that eliminates duplication across chart types
 * 
 * This component extracts all common chart logic and provides a consistent interface
 * for all Chart.js chart types in the application.
 */
export default function BaseChart({
  // Chart type and component
  ChartComponent,
  chartType,
  
  // Data configuration
  selectedCheckbox = [],
  xAxisLabel,
  yAxisLabel,
  graphLabel,
  
  // Chart customization
  chartConfig = {},
  dataTransformer,
  
  // Legacy props (maintained for backward compatibility)
  xAxis,
  yAxis,
  displayData,
  graphName,
  setDownload,
  download,
  
  // Additional props to pass through
  ...additionalProps
}) {
  const chartRef = useRef(null);
  const { getResponsiveOptions, getChartContainer } = useResponsiveChart();
  
  // State for data arrays (used by some chart types)
  const [processedData, setProcessedData] = useState({ xArray: [], yArray: [] });
  
  // Register Chart.js when component mounts
  useEffect(() => {
    registerChartJS();
  }, []);
  
  // Update download reference when chart changes
  useEffect(() => {
    if (setDownload && chartRef.current) {
      setDownload(chartRef);
    }
  }, [
    selectedCheckbox,
    xAxisLabel,
    yAxisLabel,
    graphLabel,
    graphName,
    setDownload,
    // Include other relevant dependencies
    xAxis,
    yAxis,
    displayData,
  ]);
  
  // Process data using transformer or default logic
  useEffect(() => {
    if (!selectedCheckbox.length) {
      setProcessedData({ xArray: [], yArray: [] });
      return;
    }
    
    if (dataTransformer) {
      // Use custom data transformer, passing all additional props
      const result = dataTransformer(selectedCheckbox, xAxisLabel, yAxisLabel, { 
        xAxis, 
        yAxis, 
        displayData, 
        graphName, 
        ...additionalProps 
      });
      setProcessedData(result);
    } else {
      // Default data processing
      const xArray = selectedCheckbox.map(item => item[xAxisLabel]);
      const yArray = selectedCheckbox.map(item => item[yAxisLabel]);
      setProcessedData({ xArray, yArray });
    }
  }, [selectedCheckbox, xAxisLabel, yAxisLabel, dataTransformer]);
  
  // Build chart data object
  const chartData = React.useMemo(() => {
    const baseData = {
      labels: processedData.xArray,
      datasets: [{
        label: graphLabel,
        data: processedData.yArray,
        ...chartConfig.dataset,
      }],
    };
    
    // Apply any additional data configuration
    if (chartConfig.dataConfig) {
      return chartConfig.dataConfig(baseData, processedData);
    }
    
    return baseData;
  }, [processedData, graphLabel, chartConfig]);
  
  // Build chart options
  const chartOptions = React.useMemo(() => {
    let baseOptions = {};
    
    // Add axis configuration if labels are provided
    if (xAxisLabel || yAxisLabel) {
      baseOptions.scales = {
        ...(xAxisLabel && {
          x: {
            title: {
              text: xAxisLabel,
              display: true,
            },
            ...chartConfig.scales?.x,
          }
        }),
        ...(yAxisLabel && {
          y: {
            title: {
              text: yAxisLabel,
              display: true,
            },
            ...chartConfig.scales?.y,
          }
        }),
      };
    }
    
    // Merge with chart-specific options
    if (chartConfig.options) {
      baseOptions = {
        ...baseOptions,
        ...chartConfig.options,
        // Deep merge scales if both exist
        scales: {
          ...baseOptions.scales,
          ...chartConfig.options.scales,
        },
      };
    }
    
    // Apply responsive configuration
    return getResponsiveOptions(baseOptions);
  }, [xAxisLabel, yAxisLabel, chartConfig, getResponsiveOptions]);
  
  // Get responsive container style
  const containerStyle = getChartContainer();
  
  // Render error if no chart component provided
  if (!ChartComponent) {
    return (
      <div className="flex items-center justify-center h-64 p-8 border border-red-200 rounded-lg bg-red-50">
        <div className="text-center">
          <p className="text-sm text-red-600">
            No chart component provided for type: {chartType}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div style={containerStyle}>
      <ChartComponent
        ref={chartRef}
        data={chartData}
        options={chartOptions}
        {...additionalProps}
      />
    </div>
  );
}

// Export data transformer utilities for chart-specific processing
export const dataTransformers = {
  // Aggregation transformer for bar charts
  aggregate: (selectedCheckbox, xAxisLabel, yAxisLabel) => {
    const cache = {};
    for (let row of selectedCheckbox) {
      const xValue = row[xAxisLabel];
      const yValue = Number(row[yAxisLabel]);
      cache[xValue] = cache[xValue] ? cache[xValue] + yValue : yValue;
    }
    return {
      xArray: Object.keys(cache),
      yArray: Object.values(cache),
    };
  },
  
  // Simple mapping transformer
  simple: (selectedCheckbox, xAxisLabel, yAxisLabel) => {
    return {
      xArray: selectedCheckbox.map(item => item[xAxisLabel]),
      yArray: selectedCheckbox.map(item => item[yAxisLabel]),
    };
  },
  
  // Pie chart transformer (swaps x/y for labels/data)
  pie: (selectedCheckbox, xAxisLabel, yAxisLabel) => {
    return {
      xArray: selectedCheckbox.map(item => item[yAxisLabel]), // Values become data
      yArray: selectedCheckbox.map(item => item[xAxisLabel]), // Labels become labels
    };
  },
  
  // Scatter chart transformer (creates coordinate objects)
  scatter: (selectedCheckbox, xAxisLabel, yAxisLabel, additionalProps = {}) => {
    // For scatter charts, sometimes xAxis and yAxis props are used instead
    const xField = additionalProps.xAxis || xAxisLabel;
    const yField = additionalProps.yAxis || yAxisLabel;
    
    const coordinates = selectedCheckbox.map(item => ({
      x: item[xField],
      y: item[yField],
    }));
    return {
      xArray: coordinates, // Scatter uses coordinates as data
      yArray: [], // Not used for scatter
    };
  },
};