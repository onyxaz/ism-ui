import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';

const ProductForm = ({ product, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: product || { name: '', price: '', category: '', description: '' }
  });

  const onSubmit = async (data) => {
    try {
      if (product) {
        await axios.put(`/products/update/${product.id}/`, data);
      } else {
        await axios.post('/products/create/', data);
      }
      reset();
      onSave();
    } catch (err) {
      alert('Error saving product.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input {...register('name')} placeholder="Name" required />
      <input {...register('price')} type="number" step="0.01" placeholder="Price" required />
      <input {...register('category')} placeholder="Category" />
      <input {...register('description')} placeholder="Description" />
      <button type="submit">{product ? 'Update' : 'Create'} Product</button>
    </form>
  );
};

export default ProductForm;