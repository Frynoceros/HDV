import Loading from '../Loading';
import DatasetLayout from './DatasetLayout';

export default function DatasetContainer({
  datasetData,
  datasetTableData,
  makeGraph,
  setMakeGraph,
}) {
  if (!datasetData) {
    return <Loading />;
  } else {
    return (
      <div className="flex flex-row">
        <div className="w-full flex flex-col">
          <DatasetLayout
            datasetData={datasetData}
            datasetTableData={datasetTableData}
            setMakeGraph={setMakeGraph}
          />
        </div>
      </div>
    );
  }
}
