import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axiosInstance';

const CategoryForm = ({ category, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: category || { name: '', description: '' }
  });

  const onSubmit = async (data) => {
    try {
      if (category) {
        await axios.put(`/categories/update/${category.id}/`, data);
      } else {
        await axios.post('/categories/create/', data);
      }
      reset();
      onSave();
    } catch (err) {
      alert('Error saving category.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input {...register('name')} placeholder="Category Name" required />
      <input {...register('description')} placeholder="Description" />
      <button type="submit">{category ? 'Update' : 'Create'} Category</button>
    </form>
  );
};

export default CategoryForm;