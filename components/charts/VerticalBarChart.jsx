import React from 'react';
import { Bar } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function VerticalBarChart(props) {
  const chartConfig = getChartConfig('Vertical Bar Chart');
  
  return (
    <BaseChart
      ChartComponent={Bar}
      chartType="Vertical Bar Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
