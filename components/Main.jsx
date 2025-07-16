import React from 'react';
import Table from './table/Table';
import Loading from './Loading';
import {useRouter} from 'next/router';

export default function Main({
  datasets,
  handleGraphView,
  datasetData,
  datasetTableData,
  setMakeGraph,
}) {
  // Extract headers and data from React Query result
  const headers = datasetTableData?.headers || [];
  const responseData = datasetTableData?.data || [];
  // const [id, setId] = useState();

  // Using router to create variable for paramaters
  const router = useRouter();
  const {pid} = router.query;

  // No longer need useEffect - data comes from React Query

  if (!datasetData || !datasetTableData) {
    return <Loading />;
  } else {
    return (
      <div className=" max-w-full overflow-none ">
        <Table
          headers={headers}
          responseData={responseData}
          pid={pid}
          datasets={datasets}
          handleGraphView={handleGraphView}
          datasetData={datasetData}
          setMakeGraph={setMakeGraph}
        />
      </div>
    );
  }
}
