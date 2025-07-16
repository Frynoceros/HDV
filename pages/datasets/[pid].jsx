import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Main from '../../components/Main';
import { useAppContext } from '../AppWrapper';
import { useDataset, useDatasetData } from '../../hooks';
import DatasetContainer from '../../components/datasetInfoLayout/DatasetContainer';
import { DatasetPageSkeleton } from '../../components/skeletons';

export default function DatasetPage() {
  const [makeGraph, setMakeGraph] = useState(false);
  const appContext = useAppContext();
  const { datasets } = appContext;

  // Using router to get dataset ID
  const router = useRouter();
  const { pid } = router.query;

  // Use React Query for data fetching
  const { 
    data: datasetData, 
    isLoading: datasetLoading, 
    error: datasetError,
    refetch: refetchDataset
  } = useDataset(pid);

  const { 
    data: datasetTableData, 
    isLoading: dataLoading, 
    error: dataError,
    refetch: refetchData
  } = useDatasetData(pid);

  // Combined loading state
  const loading = datasetLoading || dataLoading;
  const error = datasetError || dataError;

  if (loading) {
    return <DatasetPageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <p className="text-red-600 mb-4">Failed to load dataset.</p>
          <div className="space-y-2">
            <button
              onClick={() => refetchDataset()}
              className="block w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Retry Dataset Info
            </button>
            {dataError && (
              <button
                onClick={() => refetchData()}
                className="block w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Retry Dataset Data
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!datasetData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Dataset not found.</p>
      </div>
    );
  }

  if (!makeGraph) {
    return (
      <div className="w-full">
        <DatasetContainer
          datasetData={datasetData}
          datasetTableData={datasetTableData}
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
          datasetTableData={datasetTableData}
          makeGraph={makeGraph}
          setMakeGraph={setMakeGraph}
        />
      </div>
    );
  }
}
