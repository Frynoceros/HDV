import Loading from '../Loading';

const formatObj = {
  CSV: 'https://icons.iconarchive.com/icons/icons8/ios7/256/Files-Csv-icon.png',
  RDF: 'https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Mimetypes-text-rdf-icon.png',
  JSON: 'https://icons.iconarchive.com/icons/papirus-team/papirus-mimetypes/256/app-json-icon.png',
  XML: 'https://icons.iconarchive.com/icons/icons8/ios7/256/Programming-Xml-icon.png',
  ZIP: 'https://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/zip-icon.png',
  'ArcGIS GeoServices REST API':
    'https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png',
  GeoJSON:
    'https://icons.iconarchive.com/icons/vectorizeimages/iconpack/256/map-icon.png',
  HTML: 'https://icons.iconarchive.com/icons/graphics-vibe/developer/256/html-5-icon.png',
  KML: 'https://icons.iconarchive.com/icons/icons8/windows-8/256/Files-Kml-icon.png',
  'PDF Metadata':
    'https://upload.wikimedia.org/wikipedia/commons/4/42/Pdf-2127829.png',
  'OGC WFS':
    'https://upload.wikimedia.org/wikipedia/commons/4/42/Pdf-2127829.png',
  'OGC WMS':
    'https://upload.wikimedia.org/wikipedia/commons/4/42/Pdf-2127829.png',
  'No Name':
    'https://upload.wikimedia.org/wikipedia/commons/4/42/Pdf-2127829.png',
};

export default function DatasetFormats({datasetData}) {
  const {resources} = datasetData;
  if (resources === undefined) {
    return <Loading />;
  } else {
    return (
      <>
        <h3 className="divide-y border-t border-gray-300 rounded divide-gray-200  px-4 py-1 font-bold">
          Data and Resources
        </h3>
        <ul
          role="list"
          className="divide-y border-b border-gray-300 rounded divide-gray-200 px-5"
        >
          {resources.map(({format, url, name, id}) => (
            <div key={`top div ${id}`} className="flex justify-between">
              <li key={`li ${id}`} className="px-4 py-3 sm:px-0">
                <div className="flex items-end" key={`div ${id}`}>
                  <img
                    className="mr-3"
                    src={formatObj[format]}
                    alt={`Image of a ${format}`}
                    height="auto"
                    width="50"
                    key={`img ${id}`}
                  />
                  {name ? <p key={`p ${id}`}>{name}</p> : <p>{'No Name'}</p>}
                </div>
              </li>
              <div className=" flex items-center my-2">
                {format === 'CSV' ? (
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <a href={url}>Download</a>
                  </button>
                ) : (
                  console.log('No Download')
                )}
              </div>
            </div>
          ))}
        </ul>
      </>
    );
  }
}
