import {useEffect, useState} from 'react';
import Graph from '../Graph';
import Loading from '../Loading';

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
      ? setSelectedCheckbox(responseData)
      : setSelectedCheckbox([]);
    const allRows = document.getElementsByName('selectAllHelper');
    for (let checkbox of allRows) {
      checkbox.checked = e.target.checked;
    }
  };

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

        <div className="overflow-hidden overflow-x-auto overflow-y-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm ">
            <thead className="bg-gray-100">
              <tr key={`top tr`}>
                <th
                  key={`top th`}
                  className="sticky inset-y-0 left-0 bg-gray-100 px-4 py-2 text-left"
                >
                  <label
                    className="sr-only"
                    htmlFor="SelectAll"
                    key={`top label`}
                  >
                    Select All
                  </label>

                  <input
                    className="h-5 w-5 rounded border-gray-200"
                    type="checkbox"
                    id="SelectAll"
                    key={`top input`}
                    onClick={handleCheckAll}
                  />
                </th>
                {/*////////////// TABLE HEADERS /////////////////*/}
                {headers.map((header, index) => {
                  return (
                    <th
                      key={`th ${index}`}
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      <div
                        className="flex items-center gap-2"
                        key={`div ${index}`}
                      >
                        {header}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          key={`svg ${index}`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            key={`path ${index}`}
                          />
                        </svg>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {/*////////////// Iterating through to pull values for table /////////////////*/}

              {responseData.map((obj, index) => {
                const values = Object.values(obj);

                for (let i = 0; i < values.length; i++) {
                  return (
                    <tr key={`${values[index]} ${index}`}>
                      <td
                        key={`td ${values[index]} ${index}`}
                        className="sticky inset-y-0 left-0 bg-white px-4 py-2"
                      >
                        <label
                          className="sr-only"
                          htmlFor={`Row ${index}`}
                          key={`label ${values[index]} ${index}`}
                        ></label>
                        <input
                          className="h-5 w-5 rounded border-gray-200"
                          type="checkbox"
                          name="selectAllHelper"
                          id={`Row ${i}`}
                          value={obj._id}
                          onChange={handleSelectedCheckbox}
                          key={`input ${index}`}
                        />
                      </td>
                      {values.map((val, index) => {
                        return (
                          <>
                            <td
                              className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                              key={`val ${index})}`}
                            >
                              {val ? val : 'Not Entered'}
                            </td>
                          </>
                        );
                      })}
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
