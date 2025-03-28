import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';

const InventoryLogForm = ({ onCreate }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/inventory/logs/create/', data);
      reset();
      onCreate();
    } catch (err) {
      alert('Error creating inventory log.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input {...register('product_id')} placeholder="Product ID" required />
      <select {...register('action')} required>
        <option value="">Select Action</option>
        <option value="add">Add</option>
        <option value="remove">Remove</option>
      </select>
      <input {...register('quantity')} type="number" placeholder="Quantity" required />
      <input {...register('note')} placeholder="Note (optional)" />
      <button type="submit">Log Inventory Change</button>
    </form>
  );
};

export default InventoryLogForm;