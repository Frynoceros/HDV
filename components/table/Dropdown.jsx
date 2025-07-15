import {useEffect} from 'react';

export default function Dropdown({headers, selectedColumn, setSelectedColumn}) {
  const sortedHeaders = headers.sort();

  const handleDropdown = (e) => {
    setSelectedColumn(e.target.value);
  };

  useEffect(() => {}, [selectedColumn]);

  return (
    <div className="">
      <label
        htmlFor="columns"
        className="block text-sm font-medium text-gray-700"
      >
        Columns
      </label>
      <select
        id="columns"
        name="columns"
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        defaultValue={sortedHeaders[0]}
        onChange={handleDropdown}
      >
        {sortedHeaders.map((column) => {
          return <option key={column}>{column}</option>;
        })}
      </select>
    </div>
  );
}
