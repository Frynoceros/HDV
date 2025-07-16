import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useResponsiveChart } from '../../hooks';
import { registerChartJS } from './ChartRegistry';

export default function HorizontalBarChart({
  xAxis,
  yAxis,
  displayData,
  xAxisLabel,
  yAxisLabel,
  graphName,
  graphLabel,
  selectedCheckbox,
  setDownload,
  download,
}) {

  const ref = useRef(null);
  const { getResponsiveOptions, getChartContainer } = useResponsiveChart();
  
  // Ensure Chart.js is registered
  useEffect(() => {
    registerChartJS();
  }, []);
  
  // Update download reference when chart changes
  useEffect(() => {
    if (setDownload && ref.current) {
      setDownload(ref);
    }
  }, [
    xAxis,
    yAxis,
    displayData,
    yAxisLabel,
    xAxisLabel,
    graphLabel,
    graphName,
    setDownload,
  ]);

  const getXArray = selectedCheckbox.map((x) => {
    return x[xAxisLabel];
  });

  const getYArray = selectedCheckbox.map((y) => {
    return y[yAxisLabel];
  });

  const baseOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Horizontal Bar Chart',
      },
    },
  };

  const options = getResponsiveOptions(baseOptions);
  const containerStyle = getChartContainer();

  const labels = getXArray;

  const data = {
    labels,
    datasets: [
      {
        label: graphLabel,
        data: getYArray,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div style={containerStyle}>
      <Bar ref={ref} options={options} data={data} />
    </div>
  );
}
