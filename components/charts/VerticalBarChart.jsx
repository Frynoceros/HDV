import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useResponsiveChart } from '../../hooks';
import { registerChartJS } from './ChartRegistry';

export default function VerticalBarChart({
  xAxis,
  yAxis,
  displayData,
  xAxisLabel,
  yAxisLabel,
  graphName,
  graphLabel,
  selectedCheckbox,
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
    yAxisLabel,
    xAxisLabel,
    graphLabel,
    graphName,
    setDownload,
  ]);

  const [getXArray, setGetXArray] = useState([]);
  const [getYArray, setGetYArray] = useState([]);

  useEffect(() => {
    const cache = {};
    for (let row of selectedCheckbox) {
      cache[row[xAxisLabel]]
        ? (cache[row[xAxisLabel]] += Number(row[yAxisLabel]))
        : (cache[row[xAxisLabel]] = Number(row[yAxisLabel]));
    }
    setGetXArray(Object.keys(cache));
    setGetYArray(Object.values(cache));
  }, [selectedCheckbox, xAxis, yAxis]);



  const data = {
    labels: getXArray,
    datasets: [
      {
        label: graphLabel,
        data: getYArray,
        backgroundColor: 'red',
      },
    ],
  };

  const baseOptions = {
    scales: {
      x: {
        title: {
          text: xAxisLabel,
          display: true,
          // stacked: true
        },
      },
      y: {
        title: {
          text: yAxisLabel,
          display: true,
          // stacked: true
        },
      },
    },
  };

  const options = getResponsiveOptions(baseOptions);
  const containerStyle = getChartContainer();

  return (
    <div style={containerStyle}>
      <Bar ref={ref} options={options} data={data} />
    </div>
  );
}
