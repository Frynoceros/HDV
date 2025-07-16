import React, { useEffect, useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import FillerDiv from './FillerDiv';
import GraphHeader from './GraphHeader';
import LazyChartLoader from './charts/LazyChartLoader';

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

  // Chart configuration with axis requirements
  const chartConfig = {
    'Scatter Chart': { xAxis: 'X Axis (Number/Word)', yAxis: 'Y Axis (Number)' },
    'Vertical Bar Chart': { xAxis: 'X Axis (Number/Word)', yAxis: 'Y Axis (Number)' },
    'Pie Chart': { xAxis: 'X Axis (Number)', yAxis: 'Y Axis (Number/Word)' },
    'Doughnut Chart': { xAxis: 'X Axis (Number)', yAxis: 'Y Axis (Number/Word)' },
    'Area Chart': { xAxis: 'X Axis (Number/Word)', yAxis: 'Y Axis (Number)' },
    'Radar Chart': { xAxis: 'X Axis (Number)', yAxis: 'Y Axis (Word)' },
    'Horizontal Bar Chart': { xAxis: 'X Axis (Number)', yAxis: 'Y Axis (Number)' },
    'Polar Area Chart': { xAxis: 'X Axis (Number)', yAxis: 'Y Axis (Number)' },
    'Line Chart': { xAxis: 'X Axis (Number)', yAxis: 'Y Axis (Number)' },
  };

  // Get chart display component
  const getChartDisplay = () => {
    if (!graphType || graphType === 'select') {
      return <FillerDiv />;
    }

    return (
      <LazyChartLoader
        chartType={graphType}
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
    );
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
  }, [xAxis]);

  useEffect(() => {
    setYAxisLabel(yAxis);
  }, [yAxis]);

  const share = [{label: 'Download'}, {label: 'Share'}];

  return (
    <div className="flex flex-col">
      <GraphHeader datasetData={datasetData} setMakeGraph={setMakeGraph} />

      <div>
        <div className="h-auto border border-black rounded-lg bg-white px-2 py-2 shadow sm:px-6 min-h-[300px] md:min-h-[400px]">
          {getChartDisplay()}
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

                  <div className="space-y-2">
                    <label
                      htmlFor="gLabel"
                      className="block text-base font-medium text-gray-900"
                    >
                      Graph Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="graphLabel"
                        id="gLabel"
                        value={graphLabel}
                        className="block w-full rounded-lg border border-gray-300 py-3 px-4 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter a name for your graph"
                        onChange={(e) => setGraphLabel(e.target.value)}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <QuestionMarkCircleIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Mobile-First Form Layout */}
                  <div className="space-y-6 mt-6">
                    {/* Graph Type Selection */}
                    <div className="space-y-2">
                      <label
                        htmlFor="graphType"
                        className="block text-base font-medium text-gray-900"
                      >
                        Graph Type
                      </label>
                      <select
                        id="graphType"
                        name="graphType"
                        value={graphType}
                        className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm touch-manipulation"
                        onChange={(e) => setGraphType(e.target.value)}
                      >
                        {typeHTML}
                      </select>
                    </div>

                    {/* Two-column layout for larger screens, stacked on mobile */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* X AXIS SELECTION */}
                      <div id="xOptionsDiv" className="space-y-2">
                        <label
                          htmlFor="xOption"
                          className="block text-base font-medium text-gray-900"
                        >
                          {graphType ? chartConfig[graphType]?.xAxis : 'X-Axis'}
                        </label>
                        <select
                          id="xOption"
                          name="xOption"
                          value={xAxis}
                          className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm touch-manipulation"
                          onChange={(e) => setXAxis(e.target.value)}
                        >
                          {xAxisOptions}
                        </select>
                        
                        {/* X AXIS CUSTOM LABEL */}
                        {(graphType === 'Vertical Bar Chart' || graphType === 'Scatter Chart') && (
                          <div className="space-y-2 mt-4">
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="xLabel"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Custom X-Axis Label
                              </label>
                              <span className="text-xs text-gray-500">
                                Optional
                              </span>
                            </div>
                            <input
                              type="text"
                              id="xLabel"
                              name="xLabel"
                              value={xAxisLabel}
                              onChange={(e) => setXAxisLabel(e.target.value)}
                              className="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-base focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Enter custom label"
                            />
                          </div>
                        )}
                      </div>

                      {/* Y AXIS SELECTION */}
                      <div id="yOptionsDiv" className="space-y-2">
                        <label
                          htmlFor="yOption"
                          className="block text-base font-medium text-gray-900"
                        >
                          {graphType ? chartConfig[graphType]?.yAxis : 'Y-Axis'}
                        </label>
                        <select
                          id="yOption"
                          name="yOption"
                          value={yAxis}
                          className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm touch-manipulation"
                          onChange={(e) => setYAxis(e.target.value)}
                        >
                          {yAxisOptions}
                        </select>
                        
                        {/* Y AXIS CUSTOM LABEL */}
                        {(graphType === 'Vertical Bar Chart' || graphType === 'Scatter Chart') && (
                          <div className="space-y-2 mt-4">
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="yLabel"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Custom Y-Axis Label
                              </label>
                              <span className="text-xs text-gray-500">
                                Optional
                              </span>
                            </div>
                            <input
                              type="text"
                              id="yLabel"
                              name="yLabel"
                              value={yAxisLabel}
                              onChange={(e) => setYAxisLabel(e.target.value)}
                              className="block w-full rounded-lg border border-gray-300 py-2.5 px-3 text-base focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Enter custom label"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              type="button"
              onClick={downloadImage}
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 touch-manipulation"
            >
              <span>Download Chart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
