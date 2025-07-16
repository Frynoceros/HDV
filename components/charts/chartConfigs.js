/**
 * Centralized chart configurations for all chart types
 * 
 * This file contains chart-specific styling, options, and data transformations
 * to eliminate duplication and provide consistent theming across all charts.
 */

import { dataTransformers } from './BaseChart';

// Common color schemes
export const colorSchemes = {
  // Single color for simple charts
  primary: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  
  // Multi-color palette for pie/doughnut charts
  multiColor: {
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
    borderWidth: 1,
  },
};

// Chart-specific configurations
export const chartConfigs = {
  'Line Chart': {
    dataTransformer: dataTransformers.simple,
    dataset: colorSchemes.primary,
    options: {},
  },
  
  'Vertical Bar Chart': {
    dataTransformer: dataTransformers.aggregate,
    dataset: colorSchemes.primary,
    options: {},
  },
  
  'Horizontal Bar Chart': {
    dataTransformer: dataTransformers.simple,
    dataset: {
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    options: {
      indexAxis: 'y', // Makes bar chart horizontal
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: 'Horizontal Bar Chart',
        },
      },
    },
  },
  
  'Pie Chart': {
    dataTransformer: dataTransformers.pie,
    dataset: colorSchemes.multiColor,
    options: {},
    // Custom data configuration for pie charts
    dataConfig: (baseData, processedData) => ({
      labels: processedData.yArray, // Pie charts use yArray as labels
      datasets: [{
        ...baseData.datasets[0],
        data: processedData.xArray, // And xArray as data values
      }],
    }),
  },
  
  'Doughnut Chart': {
    dataTransformer: dataTransformers.pie,
    dataset: colorSchemes.multiColor,
    options: {
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
    // Custom data configuration for doughnut charts (same as pie)
    dataConfig: (baseData, processedData) => ({
      labels: processedData.yArray,
      datasets: [{
        ...baseData.datasets[0],
        data: processedData.xArray,
      }],
    }),
  },
  
  'Area Chart': {
    dataTransformer: dataTransformers.simple,
    dataset: {
      fill: true,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  },
  
  'Radar Chart': {
    dataTransformer: dataTransformers.pie, // Uses same transformer as pie (labels/data swap)
    dataset: colorSchemes.multiColor,
    options: {
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
        }
      }
    },
    // Custom data configuration for radar charts (same as pie)
    dataConfig: (baseData, processedData) => ({
      labels: processedData.yArray,
      datasets: [{
        ...baseData.datasets[0],
        data: processedData.xArray,
      }],
    }),
  },
  
  'Scatter Chart': {
    dataTransformer: dataTransformers.scatter,
    dataset: {
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    options: {},
    // Custom data configuration for scatter charts
    dataConfig: (baseData, processedData) => ({
      datasets: [{
        ...baseData.datasets[0],
        data: processedData.xArray, // Use coordinates array
      }],
    }),
  },
  
  'Polar Area Chart': {
    dataTransformer: dataTransformers.simple,
    dataset: {
      fill: true,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  },
};

// Helper function to get configuration for a chart type
export function getChartConfig(chartType) {
  return chartConfigs[chartType] || {
    dataTransformer: dataTransformers.simple,
    dataset: colorSchemes.primary,
    options: {},
  };
}

// Export available chart types
export const availableChartTypes = Object.keys(chartConfigs);