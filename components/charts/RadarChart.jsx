import React, { useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { useResponsiveChart } from '../../hooks';
import { registerChartJS } from './ChartRegistry';

export default function RadarChart({
  xAxisLabel,
  yAxisLabel,
  graphLabel,
  selectedCheckbox,
  setDownload,
}) {
  const { getResponsiveOptions, getChartContainer } = useResponsiveChart();

  // Ensure Chart.js is registered
  useEffect(() => {
    registerChartJS();
  }, []);
  
  const getXArray = selectedCheckbox.map((x) => {
    return x[xAxisLabel];
  });

  const getYArray = selectedCheckbox.map((y) => {
    return y[yAxisLabel];
  });

  const data = {
    labels: getYArray,
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: graphLabel,
        data: getXArray,
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
    ],
  };


  const options = getResponsiveOptions();
  const containerStyle = getChartContainer();

  return (
    <div style={containerStyle}>
      <Radar data={data} options={options} />
    </div>
  );
}
