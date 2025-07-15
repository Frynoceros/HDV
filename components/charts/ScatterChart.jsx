import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import {Scatter} from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

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
  let ref = useRef(null);

  //run this function for ANY dependant changes on the graph
  useEffect(() => {
    setDownload(ref);
  }, [
    xAxis,
    yAxis,
    displayData,
    selectedCheckbox,
    yAxisLabel,
    xAxisLabel,
    graphLabel,
    graphName,
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

  const options = {
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
    <div>
      <Scatter ref={ref} options={options} data={data} className="max-h-96" />
    </div>
  );
}
