import React from 'react';
import { Pie } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function PieChart(props) {
  const chartConfig = getChartConfig('Pie Chart');
  
  return (
    <BaseChart
      ChartComponent={Pie}
      chartType="Pie Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
