import React, { useEffect, useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import { useResponsiveChart } from '../../hooks';
import { registerChartJS } from './ChartRegistry';

export default function ScatterChart({
  xAxis,
  yAxis,
  displayData,
  selectedCheckbox,
  xAxisLabel,
  yAxisLabel,
  graphName,
  graphLabel,
  setDownload,
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
    selectedCheckbox,
    yAxisLabel,
    xAxisLabel,
    graphLabel,
    graphName,
    setDownload,
  ]);

  const [dataMap, setDataMap] = useState([]);

  useEffect(() => {
    const coordinates = [];
    for (let i = 0; i < selectedCheckbox.length; i++) {
      coordinates.push({
        x: selectedCheckbox[i][xAxis],
        y: selectedCheckbox[i][yAxis],
      });
    }
    setDataMap(coordinates);
  }, [yAxis, xAxis, selectedCheckbox]);

  const baseOptions = {
    scales: {
      x: {
        title: {
          text: xAxisLabel,
          display: true,
        },
      },
      y: {
        title: {
          text: yAxisLabel,
          display: true,
        },
      },
    },
  };

  const options = getResponsiveOptions(baseOptions);
  const containerStyle = getChartContainer();

  const data = {
    datasets: [
      {
        label: graphLabel,
        data: dataMap,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div style={containerStyle}>
      <Scatter ref={ref} options={options} data={data} />
    </div>
  );
}
