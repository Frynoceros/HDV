import Link from 'next/link';
import Image from 'next/image';
import { thumbnails } from '../public/groupThumbs';
import { SparklesIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Explore Public Data',
    description: 'Access thousands of datasets from Hawaii government agencies and organizations.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Create Visualizations',
    description: 'Transform raw data into beautiful charts and graphs with our intuitive tools.',
    icon: ChartBarIcon,
  },
  {
    name: 'Data-Driven Insights',
    description: 'Discover patterns and trends in Hawaii\'s public data to make informed decisions.',
    icon: SparklesIcon,
  },
];

export default function HomePage({ groups }) {

  //function to remove hyphens and format text for main datasets page
  function titleEdit(rawText) {
    return rawText
      .split('-')
      .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
      .join(' ');
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="flex items-center gap-x-2">
                  <Image
                    className="h-12 w-12"
                    src="/seal.png"
                    alt="Hawaii State Seal"
                    width={48}
                    height={48}
                  />
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Hawaii Open Data
                  </h1>
                </div>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Explore, visualize, and analyze public data from the State of Hawaii. 
                  Access over 1,500 datasets from government agencies and create 
                  insights that matter to our community.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/datasets"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Explore Datasets
                  </Link>
                  <Link href="/groups" className="text-sm font-semibold leading-6 text-gray-900">
                    Browse by Category <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            DataExplorer.jsx
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">
                            ChartBuilder.jsx
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-14 pt-6">
                        <pre className="text-[0.8125rem] leading-6 text-gray-300">
                          <code>{`const dataset = await fetchDataset('energy-usage-2024');
const chart = createChart({
  type: 'line',
  data: dataset,
  options: {
    responsive: true,
    title: 'Hawaii Energy Usage Trends'
  }
});`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Data Visualization Made Easy
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to explore Hawaii's public data
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Categories section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32 mb-16">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore datasets organized by topic area
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {groups.slice(0, 8).map((group) => (
            <Link
              key={group}
              href={`/groups/${group}`}
              className="group relative overflow-hidden rounded-lg bg-white px-6 py-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg hover:ring-gray-900/10 transition-all duration-200"
            >
              <div className="flex items-center gap-x-4">
                <Image
                  className="h-12 w-12 flex-none"
                  src={thumbnails[group]}
                  alt={`${group} icon`}
                  width={48}
                  height={48}
                />
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  {titleEdit(group)}
                </h3>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        {groups.length > 8 && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/groups"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View all categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Static generation at build time
export async function getStaticProps() {
  try {
    const groupUrl = 'https://opendata.hawaii.gov/api/3/action/group_list';
    const res = await fetch(groupUrl);
    const data = await res.json();
    
    return {
      props: {
        groups: data.result || [],
      },
      // Revalidate every 24 hours (ISR - Incremental Static Regeneration)
      revalidate: 24 * 60 * 60, // 86400 seconds
    };
  } catch (error) {
    console.error('Error fetching groups for homepage:', error);
    return {
      props: {
        groups: [],
      },
      // Retry more frequently if there was an error
      revalidate: 60 * 60, // 1 hour
    };
  }
}