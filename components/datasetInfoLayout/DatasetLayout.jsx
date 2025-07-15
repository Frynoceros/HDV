import DatasetNotes from './DatasetNotes';
import DatasetBadges from './DatasetBadges';
import DatasetFormats from './DatasetFormats';
import DatasetTable from './DatasetTable';

const tabs = [
  {name: 'Dataset', href: '#', current: true},
  {name: 'Groups', href: '#', current: false},
  {name: 'Activity Stream', href: '#', current: false},
  {name: 'Showcases', href: '#', current: false},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DatasetLayout({datasetData, setMakeGraph}) {
  if (datasetData === undefined) {
    return;
  } else {
    return (
      <div className="basis-4/5 px-1 pt-5 flex flex-col justify-center ">
        <div className="flex items-center justify-between ">
          <h1 className="font-bold text-2xl font-medium leading-6 text-gray-900 pb-5 pl-3">
            {datasetData.title === undefined ? '' : `${datasetData.title}`}
          </h1>
          <div className="mt-3 flex mr-4 flex items-start  ">
            <button
              type="button"
              className="mr-3.5 inline-flex items-center rounded-md border shrink-0 border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={() => setMakeGraph(true)}
            >
              Create Graph
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="">
            <DatasetNotes datasetData={datasetData} />
            <DatasetFormats datasetData={datasetData} />
            <DatasetBadges datasetData={datasetData} />
            <DatasetTable datasetData={datasetData} />
          </div>
        </div>
      </div>
    );
  }
}
