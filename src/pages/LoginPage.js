import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AuthContext from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login/', data);
      login(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} placeholder="Email" required />
        <input {...register('password')} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login/', data);
      login(response.data.token);
  
      const userRole = jwtDecode(response.data.token).role;
  
      if (userRole === 'admin') navigate('/dashboard');
      else if (userRole === 'manager') navigate('/dashboard');
      else navigate('/sales'); // e.g. cashier goes to sales page
    } catch (error) {
      alert(error.response?.data?.detail || 'Login failed');
    }
  };

export default LoginPage;