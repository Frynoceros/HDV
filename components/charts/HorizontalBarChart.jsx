import React from 'react';
import { Bar } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function HorizontalBarChart(props) {
  const chartConfig = getChartConfig('Horizontal Bar Chart');
  
  return (
    <BaseChart
      ChartComponent={Bar}
      chartType="Horizontal Bar Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
