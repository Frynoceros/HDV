import ScatterChart from './charts/ScatterChart';
import VerticalBarChart from './charts/VerticalBarChart';
import PieChart from './charts/PieChart';
import {useEffect, useState} from 'react';
import FillerDiv from './FillerDiv';
import {QuestionMarkCircleIcon} from '@heroicons/react/20/solid';
import DoughnutChart from './charts/DoughnutChart';
import AreaChart from './charts/AreaChart';
import RadarChart from './charts/RadarChart';
import HorizontalBarChart from './charts/HorizontalBarChart';
import PolarAreaChart from './charts/PolarArea';
import LineChart from './charts/LineChart';
import GraphHeader from './GraphHeader';

export default function Graph({
  displayData,
  headers,
  pid,
  selectedCheckbox,
  xAxisLabel,
  yAxisLabel,
  setYAxisLabel,
  setXAxisLabel,
  setMakeGraph,
  datasetData,
}) {
  // Sort Headers for dropdowns
  const sortedHeaders = [...headers].sort();

  //set state for the current graph type
  const [graphType, setGraphType] = useState('');

  //for graphs with x axis and y axis, and labels
  const [xAxisOptions, setXAxisOptions] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxisOptions, setYAxisOptions] = useState([]);
  const [yAxis, setYAxis] = useState('');

  //State for graph label
  const [graphLabel, setGraphLabel] = useState('');

  //Creating Reference to download chart image
  const [download, setDownload] = useState(null);

  const downloadImage = () => {
    if (download !== null) {
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = download.current.toBase64Image();
      link.click();
    }
  };

  //populate types of graph choices menu
  const types = [
    'Pie Chart',
    'Doughnut Chart',
    'Area Chart',
    'Radar Chart',
    'Polar Area Chart',
    'Line Chart',
    'Vertical Bar Chart',
    'Horizontal Bar Chart',
    'Scatter Chart',
  ];
  const typeHTML = [];
  typeHTML.push(
    <option value="select" key="100">
      Select Type of Chart
    </option>
  );
  for (let i = 0; i < types.length; i++) {
    typeHTML.push(
      <option value={types[i]} key={i}>
        {types[i]}
      </option>
    );
  }

  const chartType = {
    select: {
      xAxis: '',
      yAxis: '',
      display: <div></div>,
    },
    'Scatter Chart': {
      xAxis: 'X Axis (Number/Word)',
      yAxis: 'Y Axis (Number)',
      display: (
        <ScatterChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          setDownload={setDownload}
        />
      ),
    },

    'Vertical Bar Chart': {
      xAxis: 'X Axis (Number/Word)',
      yAxis: 'Y Axis (Number)',
      display: (
        <VerticalBarChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          setDownload={setDownload}
        />
      ),
    },
    'Pie Chart': {
      xAxis: 'X Axis (Number)',
      yAxis: 'Y Axis (Number/Word)',
      display: (
        <PieChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          setDownload={setDownload}
        />
      ),
    },
    'Doughnut Chart': {
      xAxis: 'X Axis (Number)',
      yAxis: 'Y Axis (Number/Word)',
      display: (
        <DoughnutChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          setDownload={setDownload}
        />
      ),
    },

    'Area Chart': {
      xAxis: 'X Axis (Number/Word)',
      yAxis: 'Y Axis (Number)',
      display: (
        <AreaChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          download={download}
          setDownload={setDownload}
        />
      ),
    },

    'Radar Chart': {
      xAxis: 'X Axis (Number)',
      yAxis: 'Y Axis (Word)',
      display: (
        <RadarChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          setDownload={setDownload}
        />
      ),
    },

    'Horizontal Bar Chart': {
      xAxis: 'X Axis (Number)',
      yAxis: 'Y Axis (Number)',
      display: (
        <HorizontalBarChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          download={download}
          setDownload={setDownload}
        />
      ),
    },
    'Polar Area Chart': {
      xAxis: 'X Axis (Number)',
      yAxis: 'Y Axis (Number)',
      display: (
        <PolarAreaChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          download={download}
          setDownload={setDownload}
        />
      ),
    },
    'Line Chart': {
      xAxis: 'X Axis (Number)',
      yAxis: 'Y Axis (Number)',
      display: (
        <LineChart
          graphLabel={graphLabel}
          xAxis={xAxis}
          yAxis={yAxis}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          displayData={displayData}
          selectedCheckbox={selectedCheckbox}
          download={download}
          setDownload={setDownload}
        />
      ),
    },
  };

  // populating graph's label options
  useEffect(() => {
    //populate x axis dropdown options;
    const xAxisLabels = [];
    let key = 102;
    xAxisLabels.push(
      <option value="select" key={101}>
        Select X Axis
      </option>
    );
    for (const xLabel of sortedHeaders) {
      xAxisLabels.push(
        <option value={xLabel} key={key}>
          {xLabel}
        </option>
      );
      key++;
    }
    setXAxisOptions(xAxisLabels);
  }, [displayData]);

  //populate Y Axis drop down options
  useEffect(() => {
    const yAxisLabels = [];
    let key = 200;
    yAxisLabels.push(
      <option value={'select'} key={199}>
        Select Y Axis
      </option>
    );
    setXAxisLabel(xAxis);

    for (const yLabel of sortedHeaders) {
      if (yLabel !== xAxis) {
        yAxisLabels.push(
          <option value={yLabel} key={key}>
            {yLabel}
          </option>
        );
        key++;
      }
    }
    setYAxisOptions(yAxisLabels);
    if (xAxis !== '') {
      const yDropdown = document.getElementById('yOptionsDiv');
      yDropdown.style.display = 'block';
    }
  }, [xAxis]);

  useEffect(() => {
    setYAxisLabel(yAxis);
  }, [yAxis]);

  //check the graph type every time it's changed. display different choices for each type
  useEffect(() => {
    let graphMenu = document.getElementById('graphMenu');
    if (graphType === 'Vertical Bar Chart' || graphType === 'Scatter Chart') {
      const xDropdown = document.getElementById('xOptionsDiv');
      xDropdown.style.display = 'block';
    }
  }, [graphType]);

  const share = [{label: 'Download'}, {label: 'Share'}];

  return (
    <div className="flex flex-col">
      <GraphHeader datasetData={datasetData} setMakeGraph={setMakeGraph} />

      <div>
        <div className="h-auto border border-black rounded-lg bg-white px-2 py-0 shadow sm:px-6">
          {graphType ? chartType[graphType].display : <FillerDiv />}
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow my-3">
          <h2 className="sr-only" id={pid}>
            {pid}
          </h2>

          <div className="bg-white p-6 ">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5 ">
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left ">
                  <p className="text-l font-bold text-gray-900 sm:text-2xl">
                    Create your chart
                  </p>

                  <div>
                    <label
                      htmlFor="graphLabel"
                      className="block text-base font-medium text-gray-700 mt-2 "
                    >
                      Graph Name
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm flex">
                      <input
                        type="text"
                        name="graphLabel"
                        id="gLabel"
                        className="block w-full rounded-md border-gray-300 pr-10 py-2 px-2 border border-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="My best graph"
                        onChange={() => {
                          setGraphLabel(
                            document.getElementById('gLabel').value
                          );
                        }}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <QuestionMarkCircleIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 py-2 text-left gap-2">
                    <div className="">
                      <label
                        htmlFor="selectGraph"
                        className="block text-base font-medium text-gray-700 "
                      >
                        Graph Type
                      </label>

                      <select
                        id="graphType"
                        name="location"
                        className="mt-1 block w-full rounded-md border border-black border-gray-300 py-2 pl-1 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={() =>
                          setGraphType(() => {
                            return document.getElementById('graphType').value;
                          })
                        }
                      >
                        {typeHTML}
                      </select>
                    </div>
                    {/* X AXIS DROP DOWN OPTIONS */}
                    <div id="xOptionsDiv">
                      <label
                        htmlFor="xAxis"
                        className="block text-base font-medium text-gray-700 pl-1 "
                      >
                        {graphType ? chartType[graphType].xAxis : 'X-Axis'}
                      </label>

                      <select
                        id="xOption"
                        name="xOption"
                        className="mt-1 block w-full rounded-md border border-black border-gray-300 py-2 pl-1 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={() => {
                          setXAxis(() => {
                            return document.getElementById('xOption').value;
                          });
                        }}
                      >
                        {xAxisOptions}
                      </select>
                      {/* X AXIS LABELS OPTION */}
                      {graphType === 'Vertical Bar Chart' ||
                      graphType === 'Scatter Chart' ? (
                        <div>
                          <div className="flex justify-between">
                            <label
                              htmlFor="xAxisLabel"
                              className="block text-base font-medium text-gray-700"
                            >
                              Rename X-Axis
                            </label>
                            <span
                              className="text-sm text-gray-500"
                              id="email-optional"
                            >
                              Optional
                            </span>
                          </div>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="xLabel"
                              onChange={() => {
                                setXAxisLabel(
                                  document.getElementById('xLabel').value
                                );
                              }}
                              name="xLabel"
                              className="block w-full rounded-md border-gray-300 shadow-sm border border-black  px-1 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Optional"
                              aria-describedby="optional"
                            />
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {/* Y AXIS DROP DOWN OPTIONS */}
                    <div id="yOptionsDiv">
                      <label
                        htmlFor="yAxis"
                        className="block text-base font-medium text-gray-700 px-1 "
                      >
                        {graphType ? chartType[graphType].yAxis : 'Y-Axis'}
                      </label>

                      <select
                        id="yOption"
                        name="yOption"
                        className="mt-1 block w-full rounded-md border border-black border-gray-300 py-2 pl-1 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={() => {
                          setYAxis(() => {
                            return document.getElementById('yOption').value;
                          });
                        }}
                      >
                        {yAxisOptions}
                      </select>
                      <div>
                        {graphType === 'Vertical Bar Chart' ||
                        graphType === 'Scatter Chart' ? (
                          <div>
                            <div className="flex justify-between">
                              <label
                                htmlFor="yAxisLabel"
                                className="block text-base font-medium text-gray-700"
                              >
                                Rename Y-Axis
                              </label>
                              <span
                                className="text-sm text-gray-500"
                                id="optional"
                              >
                                Optional
                              </span>
                            </div>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="yLabel"
                                onChange={() => {
                                  setYAxisLabel(
                                    document.getElementById('yLabel').value
                                  );
                                }}
                                name="yLabel"
                                className="block w-full rounded-md border-gray-300 shadow-sm border border-black  px-1 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Optional"
                                aria-describedby="optional"
                              />
                            </div>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex ">
            <button
              type="button"
              key={share[0].label}
              onClick={downloadImage}
              className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 m-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="">{share[0].label}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
