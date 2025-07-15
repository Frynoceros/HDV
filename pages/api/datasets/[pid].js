// import {useEffect, useState} from 'react';
// import {useRouter} from 'next/router';

// // https://opendata.hawaii.gov/datastore/odata3.0/07c9ec56-d4f3-42d9-9bf5-b74044f83f35?$format=json
// // async function fetchData(url) {
// //   const response = await fetch(url);
// //   const data = await response.json();

// //   const firstId = await data.result.resources[0].id;
// //   console.log(returnedId, 'returned ID back');

// export default function Main() {
//   const router = useRouter();
//   const {pid} = router.query;
//   console.log(pid);
//   //fetching the database ID
//   const fetchLink = `https://opendata.hawaii.gov/api/3/action/package_show?id=${pid}`;
//   const [mainData, setMainData] = useState(null);
//   const [isLoading, setLoading] = useState(false)

//   const getData = async (url) => {
//     const getJSONLink = await fetch(url);
//     const JSONLinkResponse = await getJSONLink.json();

//     //fetching the actual data based on the database ID that came back from the first request.
//     const dataQuery = await fetch(
//       `https://opendata.hawaii.gov/datastore/odata3.0/${JSONLinkResponse.result.resources[0].id}?$format=json`
//     );
//     const graphData = await dataQuery.json();
//     setMainData(graphData.value);
//   };
//   console.log(mainData);

//   useEffect(() => {
//     getData(fetchLink);
//   }, []);

//   return (
//     <main className="-mt-32">
//       <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
//         {/* <Graph displayData={mainData} /> */}
//       </div>
//     </main>
//   );
// }
