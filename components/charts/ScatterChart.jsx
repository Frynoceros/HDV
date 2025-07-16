import React from 'react';
import { Scatter } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function ScatterChart(props) {
  const chartConfig = getChartConfig('Scatter Chart');
  
  return (
    <BaseChart
      ChartComponent={Scatter}
      chartType="Scatter Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
