import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';

const VendorForm = ({ vendor, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: vendor || { name: '', email: '', phone: '', address: '' }
  });

  const onSubmit = async (data) => {
    try {
      if (vendor) {
        await axios.put(`/vendors/update/${vendor.id}/`, data);
      } else {
        await axios.post('/vendors/create/', data);
      }
      reset();
      onSave();
    } catch (err) {
      alert('Error saving vendor');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input {...register('name')} placeholder="Name" required />
      <input {...register('email')} placeholder="Email" />
      <input {...register('phone')} placeholder="Phone" />
      <input {...register('address')} placeholder="Address" />
      <button type="submit">{vendor ? 'Update' : 'Create'} Vendor</button>
    </form>
  );
};

export default VendorForm;