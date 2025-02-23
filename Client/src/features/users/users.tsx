import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useFetchUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } from './usersApi';
import UserDetails from './singleUserComponent';

const UsersList: React.FC = () => {
  const { data: users = [], isLoading, error, refetch } = useFetchUsersQuery();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
//   const navigate = useNavigate();

  const initialUserState = { user_id: 0, full_name: '', email: '', contact_phone: '', address: '', role: 'user' };
  const [newUser, setNewUser] = useState(initialUserState);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    refetch();
  }, [users]);

  const handleAddUser = async () => {
    try {
      await addUser(newUser).unwrap();
      setNewUser(initialUserState);
      refetch();
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdateUser = async () => {
    try {
      if (!newUser.user_id) return;
      await updateUser(newUser).unwrap();
      setNewUser(initialUserState);
      setEditMode(false);
      refetch();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleEditUser = (user: any) => {
    setNewUser(user);
    setEditMode(true);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = 'status' in error ? `Error: ${error.status}` : error.message;
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" name="full_name" placeholder="Full Name" value={newUser.full_name} onChange={handleInputChange} className="input input-bordered w-full" />
        <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} className="input input-bordered w-full" />
        <input type="text" name="contact_phone" placeholder="Phone" value={newUser.contact_phone} onChange={handleInputChange} className="input input-bordered w-full" />
        <input type="text" name="address" placeholder="Address" value={newUser.address} onChange={handleInputChange} className="input input-bordered w-full" />
        <select name="role" value={newUser.role} onChange={handleInputChange} className="input input-bordered w-full">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {editMode ? (
          <button onClick={handleUpdateUser} className="btn btn-primary w-full">Update User</button>
        ) : (
          <button onClick={handleAddUser} className="btn btn-primary w-full">Add User</button>
        )}
      </div>

      <table className="table-auto w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, index: number) => (
            <tr key={user.user_id} className="border border-gray-600">
              <td>{index + 1}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.contact_phone}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>
                <div className="flex space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => handleEditUser(user)}>Edit</button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                  <button className="btn btn-sm btn-primary" onClick={() => setSelectedUserId(user.user_id)}>View</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUserId && <UserDetails userId={selectedUserId} />}
    </div>
  );
};

export default UsersList;
