import {createContext, useContext} from 'react';
import {useEffect, useState} from 'react';

const AppContext = createContext();

export default function AppWrapper({children}) {
  // All datasets returned from query
  const [datasets, setDatasets] = useState(undefined);

  const link = `https://opendata.hawaii.gov/api/3/action/package_search?rows=1500&start=0`;

  useEffect(() => {
    async function fetchData(url) {
      const res = await fetch(url);
      const data = await res.json();
      const allDatasets = data.result.results;

      setDatasets(allDatasets);
    }
    fetchData(link);
  }, []);

  const sharedState = {
    datasets: datasets,
    setDatasets: setDatasets,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
