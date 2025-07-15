export default function Pagination({
  startPagination,
  setStartPagination,
  endPagination,
  setEndPagination,
  datasets,
}) {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startPagination + 1}</span> -{' '}
          <span className="font-medium">{endPagination}</span> of{' '}
          <span className="font-medium">{datasets.length}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            if (startPagination > 0) {
              setStartPagination((startPagination -= 30));
              setEndPagination((endPagination -= 30));
            }
          }}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            if (endPagination < datasets.length) {
              setStartPagination((startPagination += 30));
              setEndPagination((endPagination += 30));
            }
          }}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
