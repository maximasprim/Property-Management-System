// src/features/register/register.tsx
import React, { useState } from 'react';
import { useRegisterUserMutation } from './RegisterApi';
import loginPic from '../../assets/login.jpg';
import { NavLink } from 'react-router-dom';
import Navbar  from '../../components/Navbar';

const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [role] = useState('user'); // Default role to 'user'
  const [message, setMessage] = useState('');

  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password, address, contact_phone: contactPhone, role }).unwrap();
      setMessage('Registration successful!');
      // Optionally, handle success actions like redirecting to another page
      setUsername('');
      setEmail('');
      setPassword('');
      setAddress('');
      setContactPhone('');
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Failed to register.';
      setMessage(errorMessage);
      console.error('Failed to register:', err);
    }
  };

  return (
    <>
    <Navbar />
      <h2 className="text-3xl font-bold text-center">Join Us</h2>
      <div className="grid sm:grid-cols-2 gap-1 h-screen bg-base-200">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Contact Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-300"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            {message && <p className="text-center mt-4">{message}</p>}
            {isError && !message && <p className="text-center text-red-500 mt-4">Error: {JSON.stringify(error)}</p>}
          </form>
          <div className="text-center mt-6">
            <p>Already have an account?</p>
            <NavLink to="/login" className="mt-2 text-blue-700 hover:underline text-2xl	font-size: 1.5rem">Login</NavLink>
          </div>
          <div className="text-center mt-4">
            <button className="text-red-400 hover:underline">Forgot Password?</button>
          </div>
          <NavLink to="/" className={({ isActive, isPending }) =>
                              isPending ? "pending" : isActive ? "active" : ""}>
                              🏡Go to HomePage
                          </NavLink>
        </div>
        <div className="flex items-center justify-center sm:h-full md:h-screen bg-base-300 p-6">
          <img src={loginPic} alt="nopic" />
        </div>
      </div>
    </>
  );
};

export default RegisterUser;