import Main from '../../components/Main';
import {useAppContext} from '../AppWrapper';
import {useState, useEffect} from 'react';
import DatasetContainer from '../../components/datasetInfoLayout/DatasetContainer';
import Loading from '../../components/Loading';
import {useRouter} from 'next/router';

export default function DatasetPage() {
  const [makeGraph, setMakeGraph] = useState(false);
  const [datasetData, setdatasetData] = useState([]);
  const appContext = useAppContext();
  const {datasets} = appContext;

  // Using router to create variable for paramaters
  const router = useRouter();
  const {pid} = router.query;

  useEffect(() => {
    if (datasets) {
      for (let i = 0; i < datasets.length; i++) {
        if (datasets[i].name === pid) {
          setdatasetData(datasets[i]);
        } else {
          ('Not Found');
        }
      }
    }
  }, [router.isReady, datasets, pid]);

  if (!datasetData && router.isReady) {
    return <Loading />;
  } else {
    if (!makeGraph) {
      return (
        <div className="w-full">
          <DatasetContainer
            datasetData={datasetData}
            makeGraph={makeGraph}
            setMakeGraph={setMakeGraph}
          />
        </div>
      );
    } else {
      return (
        <div className="w-full">
          <Main
            datasets={datasets}
            datasetData={datasetData}
            makeGraph={makeGraph}
            setMakeGraph={setMakeGraph}
          />
        </div>
      );
    }
  }
}
