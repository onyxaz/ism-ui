import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../auth/AuthContext';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login/', data);
      login(response.data.access);
      const role = jwtDecode(response.data.access).role?.toLowerCase();
      navigate(role === 'admin' || role === 'manager' ? '/dashboard' : '/sales');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full max-w-sm bg-white shadow p-8 rounded-lg border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login to ISM</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="input"
            required
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="input"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Don’t have a tenant? <a href="/register-tenant" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;