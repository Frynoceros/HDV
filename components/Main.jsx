import {useEffect, useState} from 'react';
import Table from './table/Table';
import Loading from './Loading';
import {useRouter} from 'next/router';

export default function Main({
  datasets,
  handleGraphView,
  datasetData,
  setMakeGraph,
}) {
  // Where all headers are stored
  const [headers, setHeaders] = useState([]);

  // Storing all returned query data
  const [responseData, setResponseData] = useState([]);
  // const [id, setId] = useState();

  // Using router to create variable for paramaters
  const router = useRouter();
  const {pid} = router.query;

  const link = `https://opendata.hawaii.gov/api/3/action/package_show?id=${pid}`;

  useEffect(() => {
    if (!router.isReady) {
      return;
    } else {
      async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();

        // function to filter the results for which contains CSV. Order is not always the same in formats returned.
        const filterCSV = await data.result.resources.filter((el) => {
          if (el.format === 'CSV') {
            return el.id;
          }
          return;
        });

        // Variable to store the paramaters ID

        const id = filterCSV[0].id;

        const jsonLink = `https://opendata.hawaii.gov/datastore/odata3.0/${id}?$format=json`;
        const res = await fetch(jsonLink);
        const jsonData = await res.json();

        setHeaders(Object.keys(jsonData.value[0]));
        setResponseData(jsonData.value);
      }

      fetchData(link);
    }
  }, [router.isReady, pid]);

  // console.log(datasetData, 'dd');
  // console.log(responseData, 'rd');

  if (!datasetData && !router.isReady) {
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
