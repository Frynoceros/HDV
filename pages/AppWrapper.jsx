import {createContext, useContext} from 'react';
import {useEffect, useState} from 'react';
import { datasetService } from '../services/api';
import { DEFAULT_QUERY_PARAMS } from '../constants';
import { useRouter } from 'next/router';

const AppContext = createContext();

export default function AppWrapper({children}) {
  // All datasets returned from query - only for search functionality
  const [allDatasets, setAllDatasets] = useState([]);
  const [searchDatasetNames, setSearchDatasetNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  // Only fetch all datasets when search is needed (navbar is shown)
  const [shouldFetchForSearch, setShouldFetchForSearch] = useState(false);

  useEffect(() => {
    // Only fetch datasets for search on pages that show the navbar
    const needsSearch = !router.pathname.includes('/datasets/[pid]');
    setShouldFetchForSearch(needsSearch);
  }, [router.pathname]);

  useEffect(() => {
    async function fetchDatasetsForSearch() {
      if (!shouldFetchForSearch || searchDatasetNames.length > 0) return;
      
      try {
        setLoading(true);
        setError(null);
        // Fetch only minimal data needed for search (names and titles)
        const result = await datasetService.getAll(DEFAULT_QUERY_PARAMS.DATASETS_LIMIT, 0, 'name,title');
        setAllDatasets(result.results);
        // Extract just names for efficient search
        setSearchDatasetNames(result.results.map(d => ({ name: d.name, title: d.title })));
      } catch (err) {
        setError(err);
        setSearchDatasetNames([]);
      } finally {
        setLoading(false);
      }
    }
    
    if (shouldFetchForSearch) {
      fetchDatasetsForSearch();
    }
  }, [shouldFetchForSearch, searchDatasetNames.length]);

  const sharedState = {
    // Keep datasets for backward compatibility but encourage using specific endpoints
    datasets: searchDatasetNames,
    allDatasets: allDatasets,
    searchDatasetNames: searchDatasetNames,
    setDatasets: setAllDatasets,
    datasetsLoading: loading,
    datasetsError: error,
    shouldFetchForSearch,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
