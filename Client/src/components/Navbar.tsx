
const Navbar = () => {
  return(

<nav className="bg-gray-900 text-white px-6 py-4">
        <ul className="flex justify-center space-x-6 text-sm font-semibold">
          <li><a href="#home" className="hover:text-green-400">Home</a></li>
          <li><a href="#about" className="hover:text-green-400">About Us</a></li>
          <li><a href="#services" className="hover:text-green-400">Services</a></li>
          <li><a href="#owners" className="hover:text-green-400">Owners</a></li>
          <li><a href="#properties" className="hover:text-green-400">Our Properties</a></li>
          <li><a href="#tenants" className="hover:text-green-400">Tenants</a></li>
          <li><a href="#testimonials" className="hover:text-green-400">Testimonials</a></li>
          <li><a href="#resources" className="hover:text-green-400">Resources</a></li>
          <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
          <li><a href="#maintenance" className="hover:text-green-400">Maintenance Login</a></li>
          <li><a href="#apply" className="hover:text-green-400">Apply Online</a></li>
        </ul>
      </nav>
  )
}

export default Navbar;