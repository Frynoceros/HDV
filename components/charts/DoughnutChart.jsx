import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import BaseChart from './BaseChart';
import { getChartConfig } from './chartConfigs';

export default function DoughnutChart(props) {
  const chartConfig = getChartConfig('Doughnut Chart');
  
  return (
    <BaseChart
      ChartComponent={Doughnut}
      chartType="Doughnut Chart"
      chartConfig={chartConfig}
      {...props}
    />
  );
}
