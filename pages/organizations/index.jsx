import Link from 'next/link';

export default function OrganizationsIndex({ organizations }) {

  return (
    <>
      <div>
        <h1>Organizations</h1>
        <ul>
          {organizations.map((orgName) => {
            // Function to format organization name for display
            const formatOrgName = (name) => {
              return name
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            };
            
            return (
              <li key={orgName}>
                <Link href={`/organizations/${orgName}`}>
                  {formatOrgName(orgName)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

// Static generation at build time
export async function getStaticProps() {
  try {
    const organizationUrl = 'https://opendata.hawaii.gov/api/3/action/organization_list';
    const res = await fetch(organizationUrl);
    const data = await res.json();
    
    return {
      props: {
        organizations: data.result || [],
      },
      // Revalidate every 24 hours (ISR - Incremental Static Regeneration)
      revalidate: 24 * 60 * 60, // 86400 seconds
    };
  } catch (error) {
    console.error('Error fetching organizations for organizations page:', error);
    return {
      props: {
        organizations: [],
      },
      // Retry more frequently if there was an error
      revalidate: 60 * 60, // 1 hour
    };
  }
}
