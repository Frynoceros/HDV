import React from 'react';
import {useRef, useEffect, useState} from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  let ref = useRef(null);

  //run this function for ANY dependant changes on the graphs
  useEffect(() => {
    setDownload(ref);
  }, [
    xAxis,
    yAxis,
    displayData,
    yAxisLabel,
    xAxisLabel,
    graphLabel,
    graphName,
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


  useEffect(() => {
    console.log('getXArray', getXArray);
    console.log('getYArray', getYArray);
  }, [getXArray]);

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

  const options = {
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

  return <Bar ref={ref} options={options} data={data} className="max-h-96" />;
}
