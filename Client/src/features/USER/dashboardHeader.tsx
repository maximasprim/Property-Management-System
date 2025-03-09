import { useEffect, useState } from "react";
import { useFetchUserByIdQuery } from "../../features/users/usersApi"; // Adjust the import path as necessary
import backgroundImage from "../../assets/mansion7.jpg";
import { Link } from "react-router-dom";

const ProjectHeader = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const { data: user, error, isLoading } = useFetchUserByIdQuery(userId ?? 0, {
    skip: userId === null,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div><p>Loading Failed...</p></div>;
  }

  return (
    <div
      className="relative w-full md:h-[320px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative z-10 p-4 md:p-6 text-white flex flex-col gap-3 w-[55%]">
        <p className="text-sm md:text-base">
          <span className="text-white">Dashboard</span> / True Estate Property Management
        </p>

        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full md:w-2/3 flex flex-col gap-2 text-gray-800">
          <h2 className="text-lg md:text-xl font-semibold">True Estate Property Management</h2>

          <div className="flex items-center gap-16 text-sm">
            <Link to="my_profile">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-lg hover:bg-yellow-500">
              My Profile
            </span>
            </Link>
            <span className="text-gray-500 text-lg"><span className="font-bold text-red-600 ">My ID:</span> {user?.user_id || "N/A"}</span>
            <span className="text-blue-600 text-lg hover:underline">{user?.email || "N/A"}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs text-gray-600 mt-2">
            <div>
              <p className="font-semibold text-[15px]"><span className="font-bold text-black text-lg ">Full Name: </span>{user?.full_name || "N/A"}</p>
              {/* <p className="text-gray-500">{user?.registry_id || "N/A"}</p> */}
            </div>
            {/* <div>
              <p className="font-semibold">{user?.username || "N/A"}</p>
              <p className="text-gray-500">{user?.methodology || "N/A"}</p>
            </div> */}
            <div >
              <p className="font-semibold text-[15px]"><span className="font-bold text-red-800 text-lg ">Address: </span>{user?.address || "N/A"}</p>
              
            </div>
            <div>
            <p className="font-semibold text-[15px] text-gray-500"><span className="font-bold text-black text-lg ">Phone:</span>{user?.contact_phone || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
