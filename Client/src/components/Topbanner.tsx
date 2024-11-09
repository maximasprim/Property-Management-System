
const Topbanner = () => {

return(
<div className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
        <div className="flex items-center space-x-4">
          <img src="logo.png" alt="TrueEstae Property Management" className="h-12" />
          <div className="text-green-700 text-sm font-medium">
            <p>"We are your local resource and caring professional serving You From Wherever You Are"</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-gray-800 font-medium">Welcome!</p>
          <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">Join Us !</button>
          <p className="text-gray-600">Owner Login | Resident Login</p>
        </div>
      </div>
)
}

export default Topbanner;