import {Disclosure} from '@headlessui/react';
import {useAppContext} from '../pages/AppWrapper';
import {useState} from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar';

const navigation = [
  {name: 'Home', href: '/', current: false},
  {
    name: 'Datasets',
    href: '/datasets',
    current: false,
  },
  {name: 'Groups', href: '/groups', current: false},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [inputText, setInputText] = useState('');

  const appContext = useAppContext();
  const {datasets} = appContext;

  return (
    <>
      <div className="mx-auto w-full px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center ">
              <Image
                className="block"
                src="/seal.png"
                alt="Your Company"
                height="60"
                width="60"
              />
            </div>
            <h1 className="ml-4 flex items-end text-xl pb-1">
              Open Data Hawaii Visualizer
            </h1>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"></div>
          <div className="relative z-10 flex items-center lg:hidden">
            {/* Mobile menu button */}
          </div>
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            <SearchBar datasets={datasets} />
          </div>
        </div>
        <nav
          className="hidden lg:flex lg:space-x-8 lg:py-2"
          aria-label="Global"
        ></nav>
      </div>
    </>
  );
}
