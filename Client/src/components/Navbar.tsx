
const Navbar = () => {
  return(

<nav className="bg-gray-900 text-white px-6 py-4">
        <ul className="flex justify-center space-x-6 text-sm font-semibold">
          <li><a href="/" className="hover:text-green-400">Home</a></li>
          <li><a href="/aboutUs" className="hover:text-green-400">About Us</a></li>
          <li><a href="/testimonials" className="hover:text-green-400">Services</a></li>
          <li><a href="#owners" className="hover:text-green-400">Locations</a></li>
          <li className="relative group">
      <a href="#properties" className="hover:text-green-400 cursor-pointer">Properties</a>
      <ul className="absolute left-0 hidden group-hover:block bg-gray-800 mt-2 rounded-lg shadow-lg w-40 z-50 transition-all duration-50">
        <li className="px-4 py-2 hover:bg-gray-700">
          <a href="#residential" className="text-white hover:text-green-400 block">Residential</a>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <a href="#commercial" className="text-white hover:text-green-400 block">Commercial</a>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <a href="#commercial" className="text-white hover:text-green-400 block">Vehicles</a>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <a href="#industrial" className="text-white hover:text-green-400 block">Industrial</a>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <a href="#vacant-land" className="text-white hover:text-green-400 block">Vacant Land</a>
        </li>
      </ul>
    </li>
          
          <li><a href="#tenants" className="hover:text-green-400">Our Team</a></li>
          <li><a href="/testimonials" className="hover:text-green-400">Testimonials</a></li>
          <li><a href="/contact" className="hover:text-green-400">Our Contact</a></li>
          
        </ul>
      </nav>
  )
}

export default Navbar;