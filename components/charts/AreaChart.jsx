import React from 'react';
import { Line } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function AreaChart(props) {
  const chartConfig = getChartConfig('Area Chart');
  
  return (
    <BaseChart
      ChartComponent={Line}
      chartType="Area Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
