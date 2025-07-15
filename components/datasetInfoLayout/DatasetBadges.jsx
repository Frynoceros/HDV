import Loading from '../Loading';
import {useState} from 'react';

export default function DatasetBadges({datasetData}) {
  const {tags} = datasetData;

  if (datasetData === undefined) {
    return <Loading />;
  } else {
    return (
      <div>
        <h3 className="text-l font-bold text-gray-900 px-5 pt-3">Tags</h3>
        <div className="divide-y border-b border-gray-300 rounded divide-gray-200 px-5 my-2 py-4">
          {tags !== undefined ? (
            tags.map((tag) => {
              return (
                <span
                  key={tag.display_name}
                  className="flex border border inline-flex items-center rounded-full bg-gray-100 px-3 mr-2 mt-2 py-0.5 text-xs font-medium text-gray-800"
                >
                  {tag.display_name}
                </span>
              );
            })
          ) : (
            <p>Dataset has no tags</p>
          )}
        </div>
      </div>
    );
  }
}
