import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance'; 
import AuthContext from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login/', data);
      login(response.data.token);

      const userRole = jwtDecode(response.data.token).role;
      navigate(userRole === 'admin' || userRole === 'manager' ? '/dashboard' : '/sales');
    } catch (error) {
      alert(error.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md p-6 rounded">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;