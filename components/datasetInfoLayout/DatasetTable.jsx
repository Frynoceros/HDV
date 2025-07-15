export default function DatasetTable({datasetData}) {
  const {author, maintainer, metadata_modified, metadata_created} = datasetData;

  const created = new Date(metadata_created).toLocaleString();
  const updated = new Date(metadata_modified).toLocaleString();

  const {extras} = datasetData;
  // console.log(extras);

  if (extras === undefined) {
    return;
  } else {
    return (
      <div className="px-1 sm:px-6 lg:px-8 mb-3">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-l font-bold text-gray-900">Additional Info</h3>
          </div>
          <div className="flex flex-col text-center px-4 text-sm">
            <p className="font-bold">Author</p>
            <p className="text-sm">{author}</p>
          </div>
          <div className="flex flex-col text-center px-4 text-sm">
            <p className="font-bold text-sm">Maintainer</p>
            <p className="text-sm">{maintainer}</p>
          </div>
          <div className="flex flex-col text-center px-4 text-sm">
            <p className="font-bold">Created On</p>
            <p className="text-sm">{created}</p>
          </div>
          <div className="flex flex-col text-center px-4 text-sm">
            <p className="font-bold">Last Update</p>
            <p className="text-sm">{updated}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {extras.map(({key, value}) => {
                      return (
                        <tr key={key}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {key ? key : 'Nothing Entered'}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {value ? value : 'Nothing Entered'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
