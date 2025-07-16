import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useResponsiveChart } from '../../hooks';
import { registerChartJS } from './ChartRegistry';

export default function LineChart({
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


  // TODO - Need to resolve issue with re-naming axis not re-rendering state.

  const labels = getXArray;

  const data = {
    labels,
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

  return (
    <div style={containerStyle}>
      <Line ref={ref} options={options} data={data} />
    </div>
  );
}
