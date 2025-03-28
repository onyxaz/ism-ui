import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';

const ExpenseForm = ({ onCreate }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/business-expenses/', data);
      reset();
      onCreate();
    } catch (err) {
      alert('Failed to create expense.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input {...register('vendor')} placeholder="Vendor" required />
      <input {...register('type')} placeholder="Type (e.g. Rent, Utilities)" required />
      <input {...register('amount')} type="number" placeholder="Amount" required />
      <input {...register('note')} placeholder="Note (optional)" />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;