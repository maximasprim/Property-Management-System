import React, { useState } from "react";

const Navbar = () => {
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest("#properties-dropdown")) {
      setIsPropertiesOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <ul className="flex justify-center space-x-6 text-sm font-semibold">
        <li>
          <a href="/" className="hover:text-green-400">
            Home
          </a>
        </li>
        <li>
          <a href="/aboutUs" className="hover:text-green-400">
            About Us
          </a>
        </li>
        <li>
          <a href="/ourServices" className="hover:text-green-400">
            Services
          </a>
        </li>
        <li>
          <a href="/locations" className="hover:text-green-400">
            Locations
          </a>
        </li>
        <li
          className="relative"
          id="properties-dropdown"
        >
          <a
            href="#properties"
            className="hover:text-green-400 cursor-pointer"
            onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
          >
            Properties
          </a>
          {isPropertiesOpen && (
            <ul className="absolute left-0 bg-gray-800 mt-2 rounded-lg shadow-lg w-40 z-50 transition-all duration-300">
       <li className="relative group px-4 py-2 hover:bg-gray-700">
  <a
    href="#houses"
    className="text-white hover:text-green-400 block"
  >
    Houses
  </a>
  {/* Side Menu */}
  <ul className="absolute left-full top-0 hidden group-hover:block bg-gray-800 rounded-lg shadow-lg w-40 z-50">
    <li className="px-4 py-2 hover:bg-gray-700">
      <a
        href="/houses"
        className="text-white hover:text-green-400 block"
      >
        All Listed Houses
      </a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700">
      <a
        href="/properties"
        className="text-white hover:text-green-400 block"
      >
        Apartments
      </a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700">
      <a
        href="/houses/villas"
        className="text-white hover:text-green-400 block"
      >
        Company
      </a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700">
      <a
        href="/houses/villas"
        className="text-white hover:text-green-400 block"
      >
        Cabin
      </a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700">
      <a
        href="/houses/villas"
        className="text-white hover:text-green-400 block"
      >
        Offices
      </a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700">
      <a
        href="/houses/bungalows"
        className="text-white hover:text-green-400 block"
      >
        Bungalows
      </a>
    </li>
    <li className="px-4 py-2 hover:bg-gray-700">
      <a
        href="/houses/penthouses"
        className="text-white hover:text-green-400 block"
      >
        Penthouses
      </a>
    </li>
  </ul>
</li>

              
              <li className="px-4 py-2 hover:bg-gray-700">
                <a
                  href="/vehicleshistory"
                  className="text-white hover:text-green-400 block"
                >
                  Vehicles
                </a>
              </li>
              
              <li className="px-4 py-2 hover:bg-gray-700">
                <a
                  href="/lands"
                  className="text-white hover:text-green-400 block"
                >
                   Lands
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="/ourTeam" className="hover:text-green-400">
            Our Team
          </a>
        </li>
        <li>
          <a href="/testimonials" className="hover:text-green-400">
            Testimonials
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-green-400">
            Our Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
