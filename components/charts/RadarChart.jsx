import React from 'react';
import { Radar } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function RadarChart(props) {
  const chartConfig = getChartConfig('Radar Chart');
  
  return (
    <BaseChart
      ChartComponent={Radar}
      chartType="Radar Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
