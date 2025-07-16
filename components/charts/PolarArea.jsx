import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function PolarAreaChart(props) {
  const chartConfig = getChartConfig('Polar Area Chart');
  
  return (
    <BaseChart
      ChartComponent={PolarArea}
      chartType="Polar Area Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
