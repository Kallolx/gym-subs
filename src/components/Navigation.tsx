import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Blog', href: '/blog' },
  { name: 'Shop', href: '/shop' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Disclosure
      as="nav"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 text-transparent bg-clip-text">
                    FitPosture
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-200 hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <Link
                  to="/signin"
                  className="text-gray-200 hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-purple-700 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-gray-800 hover:text-red-400 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-4 pb-4 pt-2 backdrop-blur-md bg-gray-900/95">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block text-gray-200 hover:text-red-400 px-3 py-2 text-base font-medium transition-colors duration-200"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="mt-4 space-y-2">
                <Disclosure.Button
                  as={Link}
                  to="/signin"
                  className="block w-full text-left text-gray-200 hover:text-red-400 px-3 py-2 text-base font-medium transition-colors duration-200"
                >
                  Sign in
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to="/signup"
                  className="block w-full bg-gradient-to-r from-red-500 to-purple-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:from-red-600 hover:to-purple-700 transition-all duration-200"
                >
                  Get Started
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 