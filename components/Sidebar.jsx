import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';

const navigation = [
  {name: 'Home', icon: HomeIcon, href: '/', count: 3, current: false},
  {
    name: 'Datasets',
    icon: ChartBarIcon,
    href: '/datasets',
    count: 3,
    current: false,
  },
  {name: 'Groups', icon: UsersIcon, href: '/groups', count: 3, current: false},
  // {
  //   name: 'Organizations',
  //   icon: UsersIcon,
  //   href: '/organizations',
  //   current: false,
  // },
  // {name: 'Tags', icon: FolderIcon, href: '/tags', count: 4, current: false},
  // {name: 'Formats', icon: CalendarIcon, href: '/formats', current: false},
  // {
  //   name: 'Licenses',
  //   icon: InboxIcon,
  //   href: '/licenses',
  //   count: 12,
  //   current: false,
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  return (
    <div className="flex-shrink-0 h-full sticky top-0 flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4 ml-5">
      <div className="mt-5 flex flex-grow flex-col mr-5">
        <nav className="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              className={classNames(
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              <Link key={item.name} href={item.href}>
                <span className="flex-1 mr-5 cursor-pointer">{item.name}</span>
              </Link>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
