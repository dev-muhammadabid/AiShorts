// Imports
import { Disclosure } from "@headlessui/react"; // Headless UI component for accessible disclosure (collapsible) panels
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Icons for menu open/close buttons

// Navigation items array (can be expanded for more links)
const navigation = [{ name: "AiShorts", href: "/", current: true }];

/**
 * Utility function to join class names conditionally.
 * Filters out falsy values and joins the rest by spaces.
 * @param  {...string} classes - List of class names
 * @returns {string} - Combined class string
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Navbar component that renders a responsive navigation bar.
 * Uses Disclosure for mobile menu toggle.
 */
function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-950">
      {({ open }) => (
        <>
          {/* Container for navbar content, max width with responsive padding */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              
              {/* Mobile Menu Button (only visible on small screens) */}
              <div className="sm:hidden flex items-center">
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Show close icon if menu is open, else show hamburger icon */}
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Centered Logo and Title */}
              <div className="flex flex-1 items-center justify-center">
                <div className="flex items-center space-x-2">
                  {/* Logo image */}
                  <img
                    className="h-12 w-auto"
                    src="/images/aishorts-logo.png"
                    alt="AiShorts Logo"
                  />
                  {/* App name text */}
                  <span className="text-white text-lg font-semibold">
                    AiShorts
                  </span>
                </div>
              </div>

              {/* Empty div to balance the flex layout and keep logo centered */}
              <div className="hidden sm:block w-10"></div>
            </div>
          </div>

          {/* Mobile menu panel that appears when Disclosure is open */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium text-center"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
