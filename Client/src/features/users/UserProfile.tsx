import React, { useState, useEffect } from 'react';
import { useFetchUserByIdQuery, useUpdateUserMutation } from './usersApi';
import Avatar from 'react-avatar';

const UserProfile: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null); // ✅ Ensured userId is a number

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(Number(storedUserId)); // ✅ Convert userId to number when retrieving from localStorage
    }
  }, []);

  const { data: user, error, isLoading } = useFetchUserByIdQuery(userId ?? 0, {
    skip: userId === null,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    profile_picture: null as File | null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        contact_phone: user.contact_phone || '',
        address: user.address || '',
        profile_picture: null,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'profile_picture' && e.target.files) {
      setFormData({ ...formData, profile_picture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === null) { // ✅ Explicit check to ensure userId is not null
      alert('User ID not found. Please try again.');
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('id', String(userId)); // ✅ Ensure userId is a string before appending to FormData
    formDataToSubmit.append('full_name', formData.full_name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('contact_phone', formData.contact_phone);
    formDataToSubmit.append('address', formData.address);
    if (formData.profile_picture) {
      formDataToSubmit.append('profile_picture', formData.profile_picture);
    }

    try {
      await updateUser({ userId, formData: formDataToSubmit }).unwrap(); // ✅ userId is guaranteed to be a number
      alert('User updated successfully');
    } catch (error: any) {
      console.error('Failed to update user:', error);
      alert(error?.message || 'Failed to update user. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div>Error: {error?.data?.message || 'Something went wrong'}</div>;
  }

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-600">
      <div className="bg-gray-400 p-8 rounded-lg shadow-lg w-full">
        {user && (
          <>
            <div className="flex flex-col items-center mb-6">
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4"
                />
              ) : (
                <Avatar name={user.full_name} round={true} size="100" className="mb-4" />
              )}
              <h1 className="text-2xl font-semibold text-slate-100 mb-2">{user.full_name}</h1>
              <p className="text-md font-medium text-slate-300">{user.email}</p>
              <p className="text-md font-medium text-slate-300">{user.role}</p>
            </div>
            <div className="space-y-2 text-center mb-6">
              <p className="text-lg font-medium text-white">
                Contact Phone: <span className="font-normal text-slate-100">{user.contact_phone}</span>
              </p>
              <p className="text-lg font-medium text-white">
                Address: <span className="font-normal text-slate-100">{user.address}</span>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-md mx-auto">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Contact Phone</label>
                <input
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  placeholder="Contact Phone"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  name="profile_picture"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-md text-white font-semibold transition duration-300"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
