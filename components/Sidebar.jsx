import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          className="h-8 w-auto"
          src="/seal.png"
          alt="Hawaii Open Data"
          width={32}
          height={32}
        />
        <span className="ml-3 text-lg font-semibold">Hawaii Open Data</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        router.pathname === item.href
                          ? 'text-indigo-600'
                          : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
