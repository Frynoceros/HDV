import React, { useRef, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useResponsiveChart } from '../../hooks';
import { registerChartJS } from './ChartRegistry';

export default function PolarAreaChart({
  xAxisLabel,
  yAxisLabel,
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
  }, [yAxisLabel, xAxisLabel, graphLabel, setDownload]);

  const getXArray = selectedCheckbox.map((x) => {
    return x[xAxisLabel];
  });

  const getYArray = selectedCheckbox.map((y) => {
    return y[yAxisLabel];
  });

  const labels = getXArray;

  const baseOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
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
    labels,
    datasets: [
      {
        fill: true,
        label: graphLabel,
        data: getYArray,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div style={containerStyle}>
      <PolarArea ref={ref} options={options} data={data} />
    </div>
  );
}
