import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function OrganizationsID() {
  const [organizations, setOrganization] = useState([]);
  const router = useRouter();
  const {oid} = router.query;

  const link = `https://opendata.hawaii.gov/api/3/action/package_search?fq=tags:${oid}`;
  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setOrganization(data.result);
  }
  useEffect(() => {
    fetchData(link);
  }, []);

  console.log(organizations, 'Orgs');

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
