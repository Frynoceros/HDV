import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function OrganizationsIndex() {
  const [organizations, setOrganization] = useState([]);
  const router = useRouter();
  const {oid} = router.query;

  const link = `https://opendata.hawaii.gov/api/3/action/organization_list`;
  // const link = `https://opendata.hawaii.gov/api/3/action/package_search?fq=${oid}&rows=1000&start=0`;
  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();

    setOrganization(data.result);
  }
  useEffect(() => {
    fetchData(link);
  }, []);

  return (
    <>
      <div>
        <h1>Organizations</h1>
        {console.log(organizations)}
        {/* <ul>
          {organizations.map((id) => {
            return (
              <li>
                <Link href={`/datasets/${id}`}>
                  <a>{id}</a>
                </Link>
              </li>
            );
          })}
        </ul> */}
      </div>
    </>
  );
}
