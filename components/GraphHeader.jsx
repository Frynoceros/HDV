export default function GraphHeader({datasetData, setMakeGraph}) {
  if (datasetData !== undefined) {
  }
  return (
    <div className="border-b border-gray-200 pb-5 pr-5 flex flex-row w-full justify-between">
      <div className="flex-shrink-1 flex w-4/5 ">
        <img
          className=" h-20 w-20 rounded-full"
          src={`https://health.hawaii.gov/wp-content/themes/hic_state_template_parent/images/og-image.jpg`}
          alt="hawaii state crest"
        />
        <h1 className="text-2xl font-bold leading-6 text-gray-900 ml-3 flex items-center ">
          {datasetData.title}
        </h1>
      </div>
      <div className="mt-3 w-1/5 flex-shrink-0 flex justify-end items-center px-auto">
        <button
          type="button"
          className="inline-flex items-center flex-shrink-0 flex-nowrap rounded-md border border-transparent bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => setMakeGraph(false)}
        >
          Info Page
        </button>
      </div>
    </div>
  );
}
