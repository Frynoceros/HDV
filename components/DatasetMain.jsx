import {useState} from 'react';
import Link from 'next/link';
import Pagination from './Pagination';
import Loading from './Loading';
import Image from 'next/image';

export default function DatasetMain({datasets}) {
  // Where the pagination will start and stop. Adjusts based on clicking on pagination buttons in Pagination component.
  const [startPagination, setStartPagination] = useState(0);
  const [endPagination, setEndPagination] = useState(30);

  if (!datasets) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="flex flex-wrap grid grid-cols-3 m-3 gap-2">
          {datasets
            .map(({title, name}) => (
              <div
                key={name}
                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
              >
                <div className="flex-shrink-1">
                  <img
                    src="/seal.png"
                    width={80}
                    height={80}
                    alt="Hawaii state seal"
                  />
                </div>
                <div className="min-w-5 flex-1 flex-wrap overflow-hidden">
                  <Link href={`/datasets/${name}`}>
                    <a className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {title}
                      </p>
                    </a>
                  </Link>
                  <div className="flex"></div>
                </div>
              </div>
            ))
            .slice(startPagination, endPagination)}
        </div>
        <div>
          <Pagination
            startPagination={startPagination}
            endPagination={endPagination}
            setStartPagination={setStartPagination}
            setEndPagination={setEndPagination}
            datasets={datasets}
          />
        </div>
      </>
    );
  }
}
