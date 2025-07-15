import {useEffect, useRef} from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PolarAreaChart({
  xAxisLabel,
  yAxisLabel,
  graphLabel,
  selectedCheckbox,
  setDownload,
  download,
}) {
  let ref = useRef(null);

  //run this function for ANY dependant changes on the graph
  useEffect(() => {
    setDownload(ref);
  }, [yAxisLabel, xAxisLabel, graphLabel]);

  const getXArray = selectedCheckbox.map((x) => {
    return x[xAxisLabel];
  });

  const getYArray = selectedCheckbox.map((y) => {
    return y[yAxisLabel];
  });

  const labels = getXArray;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
    },
  };

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

  return <PolarArea ref={ref} options={options} data={data} className="max-h-96"/>;
}
