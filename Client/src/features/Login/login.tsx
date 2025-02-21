// src/features/login/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from './loginApi';
import { setCredentials } from './loginSlice';
import { Facebook,Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../components/Navbar';

interface CustomJwtPayload {
  sub: string;
  user_id: number;
  fullName: string;
  role: string;
  exp: number;
}





const LoginUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [role] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ username, password,role }).unwrap();
      dispatch(setCredentials(userData));
      setMessage('Login successful!');
      console.log('Login successful:', userData)
      const token = userData.token;
      const decoded = jwtDecode<CustomJwtPayload>(token);
      console.log('Decoded token:', decoded);
       // Navigate based on the role
       if (decoded.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      setMessage('Login failed!');
      console.error('Failed to login:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gray-500 hover:bg-green-600 rounded-md text-white font-semibold transition duration-300"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
          {message && <p className="text-center mt-4">{message}</p>}
        </form>
        <div className="text-center mt-6 text-black	color: rgb(0 0 0);">
          <p>Or log in with</p>
          <div className="flex justify-center mt-2">
            <button className="bg-white p-3 rounded-full shadow-md mx-1  hover:bg-sky-400 transition duration-300">
            <Twitter />
            </button>
            <button className="bg-white p-3 rounded-full shadow-md mx-1  hover:bg-sky-400  transition duration-300">
            <Facebook />
            </button>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600">Don't have an account? <a href="/register" className="text-purple-500 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginUser;