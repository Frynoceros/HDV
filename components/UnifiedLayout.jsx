import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import MobileNavigation from './MobileNavigation';
import { useAppContext } from '../pages/AppWrapper';
import { Bars3Icon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', icon: HomeIcon, href: '/' },
  { name: 'Datasets', icon: ChartBarIcon, href: '/datasets' },
  { name: 'Groups', icon: UsersIcon, href: '/groups' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UnifiedLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const appContext = useAppContext();
  const { searchDatasetNames } = appContext;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Mobile logo */}
          <div className="flex flex-1 items-center gap-x-4">
            <Image
              className="h-8 w-auto"
              src="/seal.png"
              alt="Hawaii Open Data"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">Hawaii Open Data</span>
          </div>

          {/* Mobile search */}
          <div className="flex flex-1 justify-end">
            <SearchBar datasets={searchDatasetNames} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
            <Image
              className="h-8 w-auto"
              src="/seal.png"
              alt="Hawaii Open Data"
              width={32}
              height={32}
            />
            <span className="ml-3 text-lg font-semibold">Hawaii Open Data</span>
          </div>
          <nav className="flex flex-1 flex-col px-6 pb-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          router.pathname === item.href
                            ? 'bg-indigo-50 text-indigo-600'
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
              <li className="mt-auto">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-gray-900">Need help?</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Explore our documentation or contact support for assistance.
                  </p>
                  <div className="mt-3">
                    <Link
                      href="/help"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-72">
        {/* Desktop header with search */}
        <div className="hidden lg:block sticky top-0 z-40 border-b border-gray-200 bg-white">
          <div className="flex h-16 items-center justify-end gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
              <SearchBar datasets={searchDatasetNames} />
            </div>
          </div>
        </div>

        <main>
          {children}
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNavigation open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
    </div>
  );
}