

const HeroSection = () => {
  return (
    <div className="bg-gray-100">
      

      {/* Navigation Bar */}
      

      {/* Hero Section */}
      <div className="relative">
        <img src="background.jpg" alt="Hero Background" className="w-full h-[500px] object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-6">
          <h2 className="text-xl font-semibold mb-2">Find out why we are your choice for</h2>
          <h1 className="text-4xl md:text-5xl font-bold">Northern Virginia Property Management</h1>
          {/* Overlay Buttons */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src="icon1.png" alt="Management" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">MANAGEMENT SERVICES</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src="icon2.png" alt="Services" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">OUR SERVICES</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src="icon3.png" alt="Tenant Resources" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">TENANT RESOURCES</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src="icon4.png" alt="Quote" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">GET A QUOTE</button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Section - About Text */}
      <section className="py-12 px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Get to Know Circle Property Management</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We are a dedicated property management service focused on offering high-quality services to property owners and tenants in Northern Virginia and DC. Whether you’re looking to rent, manage, or lease properties, we’re here to guide you every step of the way.
        </p>
      </section>

      {/* Footer (Optional: Adjust as needed) */}
      <footer className="py-4 text-center text-sm text-gray-600">
        <p>Text Size: <span className="underline cursor-pointer">A</span> <span className="underline cursor-pointer">A</span> <span className="underline cursor-pointer">A</span></p>
      </footer>
    </div>
  );
};

export default HeroSection;
