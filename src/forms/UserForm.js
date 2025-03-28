import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';

const UserForm = ({ user, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: user || { email: '', name: '', role: 'cashier', password: '' }
  });

  const onSubmit = async (data) => {
    try {
      if (user) {
        await axios.put(`/users/update/${user.id}/`, data);
      } else {
        await axios.post('/users/register/', data);
      }
      reset();
      onSave();
    } catch (err) {
      alert('Failed to save user.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input {...register('name')} placeholder="Full Name" required />
      <input {...register('email')} placeholder="Email" required />
      <select {...register('role')}>
        <option value="admin">Admin</option>
        <option value="cashier">Cashier</option>
        <option value="manager">Manager</option>
      </select>
      {!user && (
        <input {...register('password')} type="password" placeholder="Password" required />
      )}
      <button type="submit">{user ? 'Update' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;