import DatasetMain from '../../components/DatasetMain';
import {useAppContext} from '../AppWrapper';

export default function DatasetsIndex() {
  const appContext = useAppContext();
  const {datasets} = appContext;

  return (
    <div className="flex flex-col ">
      <DatasetMain datasets={datasets} />
    </div>
  );
}
