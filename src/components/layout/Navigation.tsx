import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { XMarkIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Courses', href: '/courses' },
  { name: 'Blog', href: '/blog' },
  { name: 'Shop', href: '/shop' },
  { name: 'Subscription', href: '/subscription' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-transparent bg-clip-text">
              FitPosture
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-200 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-200 hover:text-amber-400 transition-colors duration-200"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">{user.email}</span>
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 py-2 shadow-xl ring-1 ring-gray-800"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/exercise-log"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Exercise Log
                      </Link>
                      <Link
                        to="/progress-photos"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Progress Photos
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-200 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-200 hover:text-amber-400"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-gray-900 shadow-xl"
            >
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-transparent bg-clip-text">
                  FitPosture
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-200 hover:text-amber-400"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="px-2 py-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <div className="px-3 py-4 border-t border-gray-800">
                      <div className="flex items-center space-x-2 mb-4">
                        <UserCircleIcon className="h-6 w-6 text-gray-200" />
                        <span className="text-sm font-medium text-gray-200">{user.email}</span>
                      </div>
                      <Link
                        to="/profile"
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/exercise-log"
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Exercise Log
                      </Link>
                      <Link
                        to="/progress-photos"
                        className="block rounded-lg px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Progress Photos
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full mt-2 rounded-lg px-3 py-2 text-left text-base font-medium text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="px-3 py-4 border-t border-gray-800">
                    <Link
                      to="/signin"
                      className="block rounded-lg px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-800 hover:text-amber-400"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="mt-2 block rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2 text-base font-medium text-white hover:from-amber-600 hover:to-orange-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
} 