import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterTenantPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/register-tenant/', data);
      alert('Tenant registered successfully. You can now log in.');
    } catch (error) {
      alert(error.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register Tenant</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('company_name')} placeholder="Company Name" required />
        <input {...register('database_name')} placeholder="Database Name" required />
        <input {...register('admin_email')} placeholder="Admin Email" required />
        <input {...register('admin_password')} type="password" placeholder="Admin Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterTenantPage;