import {useState} from 'react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid';
import {Combobox} from '@headlessui/react';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Searchbar({datasets}) {
  const [query, setQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState(null);

  console.log(datasets);
  // const sortedByTitle = [...datasets.sort()];

  const filteredDatasets =
    query === ''
      ? datasets
      : datasets.filter(({title}) => {
          return title.toLowerCase().includes(query.toLowerCase());
        });

  if (!datasets) {
    return;
  } else {
    return (
      <Combobox as="div" value={selectedDataset} onChange={setSelectedDataset}>
        <Combobox.Label className="block text-sm font-medium text-gray-700 "></Combobox.Label>
        <div className="relative mb-1">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(data) => data?.title}
            placeholder="Search..."
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredDatasets.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredDatasets.map(({title, id, name}) => (
                <Combobox.Option
                  key={id}
                  value={title}
                  className={({active}) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({active, selected}) => (
                    <>
                      <span
                        className={classNames(
                          'block truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        <Link href={`/datasets/${name}`}>{title}</Link>
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    );
  }
}
