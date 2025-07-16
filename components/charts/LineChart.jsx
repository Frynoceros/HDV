import React from 'react';
import { Line } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function LineChart(props) {
  const chartConfig = getChartConfig('Line Chart');
  
  return (
    <BaseChart
      ChartComponent={Line}
      chartType="Line Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
