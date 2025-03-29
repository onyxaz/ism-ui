import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegisterTenantPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/register-tenant/', data);
      alert('Tenant registered successfully. You can now log in.');
      reset();
    } catch (error) {
      alert(error.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Register Tenant</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('company_name')} className="w-full border p-2 rounded" placeholder="Company Name" required />
          <input {...register('database_name')} className="w-full border p-2 rounded" placeholder="Database Name" required />
          <input {...register('admin_email')} className="w-full border p-2 rounded" placeholder="Admin Email" required />
          <input {...register('admin_password')} className="w-full border p-2 rounded" type="password" placeholder="Admin Password" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTenantPage;