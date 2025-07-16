import {useEffect, useState, useRef} from 'react';
import Graph from '../Graph';
import Loading from '../Loading';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useTouch, useLongPress } from '../../hooks';

export default function Table({
  headers,
  responseData,
  pid,
  datasets,
  handleGraphView,
  setMakeGraph,
  datasetData,
}) {
  const [selectedCheckbox, setSelectedCheckbox] = useState([], () => {});
  const [xAxisLabel, setXAxisLabel] = useState('');
  const [yAxisLabel, setYAxisLabel] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  
  // Calculate pagination
  const totalItems = responseData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = responseData?.slice(startIndex, endIndex) || [];

  // function to save entire object of element selected by checkbox

  function handleSelectedCheckbox(e) {
    const checkedValue = Number(e.target.value);
    if (e.target.checked === true) {
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i]._id === checkedValue) {
          setSelectedCheckbox((prevArray) => [...prevArray, responseData[i]]);
        }
      }
    } else if (e.target.checked === false) {
      setSelectedCheckbox((prevArray) => {
        const newArr = [...prevArray];
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i]._id === checkedValue) {
            newArr.splice(i, 1);
            return newArr;
          }
        }
      });
    }
  }

  useEffect(() => {}, [selectedCheckbox]);

  const handleCheckAll = (e) => {
    e.target.checked
      ? setSelectedCheckbox(currentData)
      : setSelectedCheckbox([]);
    const allRows = document.getElementsByName('selectAllHelper');
    for (let checkbox of allRows) {
      checkbox.checked = e.target.checked;
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Clear checkboxes when changing pages
    setSelectedCheckbox([]);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setSelectedCheckbox([]);
  };

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedCheckbox([]);
  }, [responseData]);

  // Touch gesture support for table scrolling
  const tableRef = useRef(null);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouch();

  // Long press for multi-select (future enhancement)
  const longPressProps = useLongPress((e) => {
    // Future: implement multi-select mode
    console.log('Long press detected - could enable multi-select mode');
  }, 800);

  if (!datasets && !pid) {
    return <Loading />;
  } else {
    return (
      <div className="rounded-lg flex-wrap p-2 m-3">
        <Graph
          displayData={responseData}
          pid={pid}
          headers={headers}
          selectedCheckbox={selectedCheckbox}
          xAxisLabel={xAxisLabel}
          setXAxisLabel={setXAxisLabel}
          yAxisLabel={yAxisLabel}
          setYAxisLabel={setYAxisLabel}
          datasets={datasets}
          handleGraphView={handleGraphView}
          setMakeGraph={setMakeGraph}
          datasetData={datasetData}
        />

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Selected: {selectedCheckbox.length} rows
          </div>
        </div>

        <div 
          ref={tableRef}
          className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-sm touch-pan-x"
          onTouchStart={(e) => handleTouchStart(e, tableRef)}
          onTouchMove={(e) => handleTouchMove(e, tableRef)}
          onTouchEnd={handleTouchEnd}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="sticky inset-y-0 left-0 bg-gray-100 px-4 py-3 text-left">
                  <label className="sr-only" htmlFor="SelectAll">
                    Select All (Page)
                  </label>
                  <input
                    className="h-5 w-5 rounded border-gray-200"
                    type="checkbox"
                    id="SelectAll"
                    onClick={handleCheckAll}
                  />
                </th>
                {/*////////////// TABLE HEADERS /////////////////*/}
                {headers.map((header, index) => {
                  return (
                    <th
                      key={`header-${index}-${header}`}
                      className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <span className="truncate">{header}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-700 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {/*////////////// Iterating through to pull values for table /////////////////*/}

              {currentData.map((obj, rowIndex) => {
                const values = Object.values(obj);
                const globalIndex = startIndex + rowIndex;
                
                return (
                  <tr key={obj._id || `row-${globalIndex}`} className="hover:bg-gray-50">
                    <td
                      className="sticky inset-y-0 left-0 bg-white px-4 py-3 hover:bg-gray-50"
                    >
                      <label
                        className="sr-only"
                        htmlFor={`Row ${globalIndex}`}
                      >
                        Select Row {globalIndex + 1}
                      </label>
                      <input
                        className="h-5 w-5 rounded border-gray-200"
                        type="checkbox"
                        name="selectAllHelper"
                        id={`Row ${globalIndex}`}
                        value={obj._id}
                        onChange={handleSelectedCheckbox}
                      />
                    </td>
                    {values.map((val, colIndex) => {
                      return (
                        <td
                          className="px-4 py-3 text-gray-900 max-w-xs truncate"
                          key={`${obj._id || globalIndex}-col-${colIndex}`}
                          title={val || 'Not Entered'}
                        >
                          {val ? val : 'Not Entered'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
              </button>
              
              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
