import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';

const SalesForm = ({ onCreate }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/sales/', data);
      reset();
      onCreate();
    } catch (err) {
      alert('Failed to record sale.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input {...register('product_id')} placeholder="Product ID" required />
      <input {...register('quantity')} type="number" placeholder="Quantity" required />
      <input {...register('price')} type="number" placeholder="Price" required />
      <input {...register('payment_method')} placeholder="Payment Method" />
      <input {...register('note')} placeholder="Note (optional)" />
      <button type="submit">Record Sale</button>
    </form>
  );
};

export default SalesForm;