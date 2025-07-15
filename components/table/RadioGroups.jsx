import {useEffect} from 'react';

export default function RadioGroup({selectedGraphType, setSelectedGraphType}) {
  const graphTypes = ['Bar Graph', 'Pie Chart', 'Scatter Plot'];

  const handleGraphType = (e) => {
    setSelectedGraphType(e.target.value);
  };

  useEffect(() => {}, [selectedGraphType]);
  return (
    <div className="pt-3 px-5">
      <label className="text-xl font-medium text-gray-900">
        Choose your graph type
      </label>
      {/* <p className="text-sm leading-5 text-gray-500">Choose your graph type</p> */}
      <fieldset className="mt-4">
        <legend className="sr-only">Graph Type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {graphTypes.map((type, index) => (
            <div key={type} className="flex items-center">
              <input
                id={type}
                key={`input ${index}`}
                name="notification-method"
                type="radio"
                defaultChecked={type === 'Bar Graph'}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                value={type}
                onChange={handleGraphType}
              />
              <label
                htmlFor={type}
                key={`label ${index}`}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
